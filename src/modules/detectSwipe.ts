import { isElementInPath, listenIfTrue } from '@/utils/dom'
import { copyObject, minus } from '@/utils/fp'
import { isClose } from '@/utils/functions'
import { debounce, mapValues, mergeWith, omit, throttle } from 'lodash'

type SwipeDirection = 'up' | 'down' | 'left' | 'right'

interface Position {
	top: number
	left: number
	right: number
	bottom: number
}

interface Bounds extends Position {
	width: number
	height: number
}

//
// CALCULATIONS:
//

const getDefaultAllow = () =>
	copyObject({
		up: false,
		down: false,
		left: false,
		right: false,
	})

const { abs } = Math

const getBounds = (el: HTMLElement): Bounds => {
	const { width, height, top, left, right, bottom } =
		el.getBoundingClientRect()
	return { width, height, top, left, right, bottom }
}

const toPosition = (bounds: Bounds): Position =>
	omit(bounds, ['height', 'width'])

const toSwipeDir = <V>(
	object: Record<'top' | 'left' | 'right' | 'bottom', V>,
): Record<SwipeDirection, V> => ({
	up: object.bottom,
	down: object.top,
	left: object.right,
	right: object.left,
})

const isH = (direction: SwipeDirection | null): boolean =>
	['left', 'right'].includes(direction as any)
const isV = (direction: SwipeDirection | null): boolean =>
	['up', 'down'].includes(direction as any)

const getPosition = (el: HTMLElement): Position => toPosition(getBounds(el))

const relativePosition = (
	el: HTMLElement,
	container: HTMLElement | Window,
): Position => {
	const elBounds = getBounds(el)
	if (container instanceof Window)
		return {
			top: elBounds.top,
			left: elBounds.left,
			bottom: elBounds.top + elBounds.height - window.innerHeight,
			right: elBounds.left + elBounds.width - window.innerWidth,
		}
	const containerBounds = getPosition(container)
	return mergeWith(toPosition(elBounds), containerBounds, minus)
}

const getBoundsReached = (
	poz: Position,
	threshold: number,
): { [key in keyof Position]: boolean } =>
	mapValues(poz, n => isClose(n, 0, threshold))

//
// ACTIONS:
//

export default function detectSwipe(
	el: HTMLElement,
	container: HTMLElement | Window = window,
) {
	//
	// Data:
	const listeners: Function[] = []

	let _onScreen = false,
		_allowSides = getDefaultAllow(),
		_allowSwipe = false,
		_progress = 0,
		_swiping: SwipeDirection | null = null,
		_swiped: SwipeDirection | null = null,
		_lastTouch = { x: 0, y: 0, timestamp: 0 }

	const observer = new IntersectionObserver(
		([entry]) => (_onScreen = entry.isIntersecting),
		{
			root: container instanceof Window ? document : container,
			rootMargin: '-30px',
		},
	)

	//
	// Local Actions:

	const isVisible = () => _onScreen

	const listen = <T extends keyof DocumentEventMap>(
		type: T,
		callback: (e: DocumentEventMap[T]) => any,
		options?: boolean | AddEventListenerOptions,
	) => {
		const stop = listenIfTrue(container, isVisible, type, callback, options)
		listeners.push(stop)
	}

	const triggerSwipe = () => {
		_swiped = _swiping
		console.log('SWIPE', _swiping)

		setTimeout(() => resetState(true), 500)
	}

	const resetState = (setAllowed = false) => {
		_swiping = null
		_swiped = null
		_progress = 0
		if (!setAllowed) return
		const relPoz = relativePosition(el, container),
			boundsReached = getBoundsReached(relPoz, 50)
		_allowSides = toSwipeDir(boundsReached)
	}

	const progressSwipe = (
		direction: SwipeDirection,
		progress: number,
		e?: Event,
	) => {
		if (
			_swiped ||
			!_allowSwipe ||
			(!_allowSides[direction] && _swiping !== direction)
		)
			return resetState()

		_progress += progress
		if (!_swiping) {
			_swiping = direction
			_allowSides = getDefaultAllow()
		}
		if (e?.cancelable) e.preventDefault()
	}

	const checkProgress = () => _progress > 200 && triggerSwipe()

	//
	// Event Handlers:

	const onWheel = (e: WheelEvent) => {
		_allowSwipe = isElementInPath(e, el)
		const swipeDir = _swiping ?? (e.deltaY > 0 ? 'up' : 'down'),
			progressMade = abs(e.deltaY)

		progressSwipe(swipeDir, progressMade, e)
		checkProgress()
	}

	const onTouchStart = (e: TouchEvent) => {
		const { timeStamp: timestamp, touches } = e,
			{ clientX: x, clientY: y } = touches[0]
		_lastTouch = { x, y, timestamp }
		_allowSwipe = isElementInPath(e, el)
	}

	const onTouchMove = (e: TouchEvent) => {
		if (!_allowSwipe) return

		const { timeStamp: timestamp, touches } = e,
			{ clientX: x, clientY: y } = touches[0],
			xVel = (x - _lastTouch.x) / (timestamp - _lastTouch.timestamp),
			yVel = (y - _lastTouch.y) / (timestamp - _lastTouch.timestamp)

		// // Is it fast?
		// if (abs(xVel) < 1 && abs(yVel) < 1) return resetState()

		// Is it HORIZONTAL:
		if (abs(xVel) / abs(yVel) >= 2) {
			// Left or Right?
			const direction = _swiping ?? (xVel < 0 ? 'left' : 'right'),
				progress =
					direction === 'left' ? _lastTouch.x - x : x - _lastTouch.x
			if (isH(direction)) progressSwipe(direction, progress)
		}
		// Then it is VERTICAL
		else if (abs(yVel) / abs(xVel) >= 2) {
			// Up or Down?
			const direction = _swiping ?? (yVel > 0 ? 'down' : 'up'),
				progress = direction === 'up' ? _lastTouch.y - y : y - _lastTouch.y
			if (isV(direction)) progressSwipe(direction, progress)
		}

		_lastTouch = { x, y, timestamp }
	}

	const onTouchEnd = () => {
		checkProgress()
		setTimeout(() => resetState(true), 100)
	}

	const onScroll = () => {
		resetState(true)
	}

	//
	// Body:

	listen('wheel', onWheel, { passive: false })
	listen('touchstart', onTouchStart)
	listen('touchmove', throttle(onTouchMove, 50), { passive: false })
	listen('touchend', onTouchEnd)
	listen('scroll', debounce(onScroll, 200))

	observer.observe(el)
	resetState(true)

	debug(() => _swiped, 'SWIPED')
	debug(() => _swiping, 'SWIPING')
	debug(() => _progress, 'PROGRESS')
	debug(() => JSON.stringify(_allowSides))
}

let debug_index = 0
function debug(f: () => any, label = '') {
	const body = document.querySelector('body')
	if (!(body instanceof HTMLElement)) return

	const el = document.createElement('pre')
	el.style.position = 'fixed'
	el.style.pointerEvents = 'none'
	el.style.top = 20 * debug_index + 'px'
	body.prepend(el)

	let prev = f()
	label &&= label + ': '

	const display = () => {
		const now = f()
		if (prev !== now) el.innerHTML = label + f()
		prev = now
		requestAnimationFrame(display)
	}
	requestAnimationFrame(display)

	debug_index++
}

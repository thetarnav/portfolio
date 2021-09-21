import { isElementInPath, listenIfTrue } from '@/utils/dom'
import { copyObject, minus } from '@/utils/fp'
import { isClose, valToP } from '@/utils/functions'
import { clamp, debounce, mapValues, mergeWith, omit, throttle } from 'lodash'

type SwipeDirection = 'up' | 'down' | 'left' | 'right'

type EventType = 'swipe' | 'progress' | 'cancel'

type EventCallback = (details: {
	type: EventType
	direction: SwipeDirection
	progress: number
	distance: number
	capedProgress: number
	capedDistance: number
}) => void

type Unsubscribe = (
	type: EventType,
	direction: SwipeDirection,
	handler: EventCallback,
) => void

type CookedUnsubscribe = () => void

interface Subscribe {
	(
		type: EventType,
		direction: SwipeDirection,
		callback: EventCallback,
	): CookedUnsubscribe
	(type: EventType, callback: EventCallback): CookedUnsubscribe
}

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

interface TouchInfo {
	x: number
	y: number
	time: number
}

interface ReturnValue {
	on: Subscribe
	off: Unsubscribe
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

const getTouchInfo = (e: TouchEvent): TouchInfo => {
	const { timeStamp: time, touches } = e,
		{ clientX: x, clientY: y } = touches[0]
	return { time, x, y }
}

const calcVel = (
	nFrom: number,
	nTo: number,
	timeFrom: number,
	timeTo: number,
) => (nTo - nFrom) / (timeTo - timeFrom)

const calcTouchChange = (
	from: TouchInfo,
	to: TouchInfo,
): {
	xVel: number
	yVel: number
	xMove: number
	yMove: number
} => ({
	xVel: calcVel(from.x, to.x, from.time, to.time),
	yVel: calcVel(from.y, to.y, from.time, to.time),
	xMove: to.x - from.x,
	yMove: to.y - from.y,
})

//
// ACTIONS:
//

export default function detectSwipe(
	el: HTMLElement,
	container: HTMLElement | Window = window,
): ReturnValue {
	//
	// Data:
	const distanceThreshold = 250,
		resetTimeout = 300

	const privateListeners: Function[] = []
	let publicListeners: {
		type: EventType
		direction: SwipeDirection
		handler: EventCallback
	}[] = []

	let _onScreen = false,
		_allowSides = getDefaultAllow(),
		_allowSwipe = false,
		_distance = 0,
		_swiping: SwipeDirection | null = null,
		_swiped: SwipeDirection | null = null,
		_lastTouch = { x: 0, y: 0, time: 0 }

	const observer = new IntersectionObserver(
		([entry]) => (_onScreen = entry.isIntersecting),
		{
			root: container instanceof Window ? document : container,
			rootMargin: '-30px',
		},
	)

	//
	// Public Actions:

	const off: Unsubscribe = (
		type: EventType,
		direction: SwipeDirection,
		handler: EventCallback,
	): void => {
		publicListeners = publicListeners.filter(
			i =>
				i.type !== type ||
				i.direction !== direction ||
				i.handler !== handler,
		)
	}

	const on = (
		type: EventType,
		a: SwipeDirection | EventCallback,
		b?: EventCallback,
	): CookedUnsubscribe => {
		if (typeof a === 'function') {
			const handler = a as EventCallback
			const directions: SwipeDirection[] = ['up', 'down', 'left', 'right']
			const offs = directions.map(direction => on(type, direction, handler))
			return () => offs.forEach(f => f())
		}
		const direction = a
		const handler = b as EventCallback
		publicListeners.push({ type, direction, handler })
		return () => off(type, direction, handler)
	}

	//
	// Private Actions:

	const isVisible = () => _onScreen

	const listen = <T extends keyof DocumentEventMap>(
		type: T,
		callback: (e: DocumentEventMap[T]) => any,
		options?: boolean | AddEventListenerOptions,
	) => {
		const stop = listenIfTrue(container, isVisible, type, callback, options)
		privateListeners.push(stop)
	}

	const emit = (type: EventType, direction: SwipeDirection): void => {
		const progress = valToP(_distance, 0, distanceThreshold),
			capedProgress = clamp(progress, 0, 1),
			capedDistance = clamp(_distance, 0, distanceThreshold)
		publicListeners.forEach(
			i =>
				i.type === type &&
				i.direction === direction &&
				i.handler({
					type,
					direction,
					progress,
					distance: _distance,
					capedProgress,
					capedDistance,
				}),
		)
	}

	const triggerSwipe = () => {
		if (!_swiping) return
		_swiped = _swiping
		console.log('SWIPE', _swiping)
		emit('swipe', _swiped)

		setTimeout(updateNewBounds, resetTimeout)
	}

	const resetSwipeState = () => {
		const direction = _swiping
		_swiping = null
		_swiped = null
		_distance = 0
		direction && emit('cancel', direction)
	}

	const updateNewBounds = () => {
		resetSwipeState()
		const relPoz = relativePosition(el, container),
			boundsReached = getBoundsReached(relPoz, 50)
		_allowSides = toSwipeDir(boundsReached)
	}

	const progressSwipe = (
		direction: SwipeDirection,
		distance: number,
		e?: Event,
	) => {
		if (
			_swiped ||
			!_allowSwipe ||
			(!_allowSides[direction] && _swiping !== direction)
		)
			return resetSwipeState()

		_distance += distance
		if (!_swiping) {
			_swiping = direction
			_allowSides = getDefaultAllow()
		}
		if (e?.cancelable) e.preventDefault()

		emit('progress', direction)
	}

	const checkProgress = () => _distance >= distanceThreshold && triggerSwipe()

	//
	// Event Handlers:

	const onWheel = (e: WheelEvent) => {
		_allowSwipe = isElementInPath(e, el)
		const direction = _swiping ?? (e.deltaY > 0 ? 'up' : 'down'),
			distance = abs(e.deltaY)

		progressSwipe(direction, distance, e)
		checkProgress()
	}

	const onTouchStart = (e: TouchEvent) => {
		_lastTouch = getTouchInfo(e)
		_allowSwipe = isElementInPath(e, el)
	}

	const onTouchMove = (e: TouchEvent) => {
		if (!_allowSwipe) return

		const touch = getTouchInfo(e),
			{ xVel, yVel, xMove, yMove } = calcTouchChange(_lastTouch, touch)
		_lastTouch = touch

		// // Is it fast?
		// if (abs(xVel) < 1 && abs(yVel) < 1) return resetState()

		// Is it HORIZONTAL:
		if (abs(xVel) / abs(yVel) >= 2) {
			// Left or Right?
			const direction = _swiping ?? (xVel < 0 ? 'left' : 'right'),
				distance = direction === 'left' ? -xMove : xMove
			if (isH(direction)) progressSwipe(direction, distance)
		}
		// Then it is VERTICAL
		else if (abs(yVel) / abs(xVel) >= 2) {
			// Up or Down?
			const direction = _swiping ?? (yVel > 0 ? 'down' : 'up'),
				distance = direction === 'up' ? -yMove : yMove
			if (isV(direction)) progressSwipe(direction, distance)
		}
	}

	const onTouchEnd = () => {
		checkProgress()
		setTimeout(updateNewBounds, resetTimeout)
	}

	const onScroll = () => {
		updateNewBounds()
	}

	//
	// Body:

	listen('wheel', onWheel, { passive: false })
	listen('touchstart', onTouchStart)
	listen('touchmove', throttle(onTouchMove, 50), { passive: false })
	listen('touchend', onTouchEnd)
	listen('scroll', debounce(onScroll, resetTimeout))

	observer.observe(el)
	updateNewBounds()

	return {
		on,
		off,
	}
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

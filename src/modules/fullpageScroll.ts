import detectSwipe from 'overswipe'

function main() {
	const container = document.querySelector('#fullpage')
	const debugGroup = document.querySelector('.debug-group')

	// detectSwipe(container, container?.children[1])

	if (
		!(container?.children[1] instanceof HTMLElement) ||
		!(debugGroup instanceof HTMLElement)
	)
		return

	const swipeObserver = detectSwipe(container.children[1])

	const unsub = swipeObserver.on(
		'progress',
		({ direction, capedDistance, progress }) => {
			// console.table(a)
			// unsub()
			debugGroup.style.setProperty('--' + direction, capedDistance + 'px')
			debugGroup.classList.toggle('debug-swipe', progress >= 1)
			// progress >= 1
			// 	? debugGroup.classList.add('debug-swipe')
			// 	: debugGroup.classList.remove('debug-swipe')
		},
	)

	swipeObserver.on('swipe', ({ direction }) =>
		debugGroup.style.setProperty('--' + direction, '0px'),
	)

	swipeObserver.on('cancel', ({ direction }) =>
		debugGroup.style.setProperty('--' + direction, '0px'),
	)
}
main()

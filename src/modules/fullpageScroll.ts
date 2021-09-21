import detectSwipe from './detectSwipe'

function main() {
	const container = document.querySelector('#fullpage')
	const debugGroup = document.querySelector('.debug-group')

	// detectSwipe(container, container?.children[1])

	if (
		!(container?.children[1] instanceof HTMLElement) ||
		!(debugGroup instanceof HTMLElement)
	)
		return

	const { on, off } = detectSwipe(container.children[1])

	const unsub = on('progress', ({ direction, capedDistance }) => {
		// console.table(a)
		// unsub()
		debugGroup.style.setProperty('--' + direction, capedDistance + 'px')
	})

	on('swipe', ({ direction }) =>
		debugGroup.style.setProperty('--' + direction, '0px'),
	)
}
main()

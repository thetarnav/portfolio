/* eslint-disable import/no-duplicates */

declare interface Window {
	// extend the window
}

// declare module 'vue-router' {
// 	import { ProjectData } from '~/types'
// 	interface RouteMeta {
// 		data?: ProjectData
// 	}
// }

// with vite-plugin-md, markdowns can be treat as Vue components
declare module '*.md' {
	import { ComponentOptions } from 'vue'
	const component: ComponentOptions
	export default component
}

declare module '*.vue' {
	import { ComponentOptions } from 'vue'
	const Component: ComponentOptions
	export default Component
}

// register vue composition api globally
import { ViteSSG } from 'vite-ssg'
// @ts-ignore
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'

import type { RouteRecordRaw } from 'vue-router'

// windicss layers
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
// your custom styles here
import './styles/main.scss'
// windicss utilities should be the last style import
import 'virtual:windi-utilities.css'
// windicss devtools support (dev only)
import 'virtual:windi-devtools'

// add "project" layout to all routes in /project directory
const mappedRoutes = (generatedRoutes as RouteRecordRaw[]).map(route => {
	if (typeof route.name === 'string' && route.name.startsWith('projects'))
		return {
			...route,
			meta: Object.assign(route.meta || {}, {
				layout: 'overlay',
			}),
		}
	return route
})

const routes = setupLayouts(mappedRoutes)

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(App, { routes }, ctx => {
	// install all modules under `modules/`
	Object.values(import.meta.globEager('./modules/*.ts')).map(i =>
		i.install?.(ctx),
	)
})

import { resolve } from 'path'
import { defineConfig } from 'vite'
import fs from 'fs-extra'
import Vue from '@vitejs/plugin-vue'
import Pages, { Route } from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Markdown from 'vite-plugin-md'
import WindiCSS from 'vite-plugin-windicss'
import Inspect from 'vite-plugin-inspect'
import Prism from 'markdown-it-prism'
import matter from 'gray-matter'
import LinkAttributes from 'markdown-it-link-attributes'
import { colord } from 'colord'
import type { ProjectData } from '~/types'

const markdownWrapperClasses = 'prose prose-sm m-auto text-left'

const extendRoute = (route: Route): Route => {
	const path = resolve(__dirname, route.component.slice(1))

	// extend project routes
	if (route.path.includes('/projects')) {
		const defaultTitle = 'Project',
			defaultBackground = '#eee'

		const md = fs.readFileSync(path, 'utf-8')
		const { data: frontmatter } = matter(md)
		const id = String(route.name ?? route.path)

		// add layout to all routes in /projects folder
		route.meta = Object.assign(route.meta || {}, {
			layout: 'overlay',
		})

		if (!frontmatter) {
			// if frontmatter doesn't exist, instert default values
			const data: ProjectData = {
				id,
				title: defaultTitle,
				background: defaultBackground,
			}
			route.meta.data = data
		} else {
			// use route frontmatter to create project data
			const { title, card } = frontmatter
			const data: ProjectData = {
				id,
				title: title || defaultTitle,
				background: card?.background || defaultBackground,
				image: card?.image,
				foreground: card?.foreground,
				// turn color value from project post to rgba, with applied transparency
				shadow: card?.shadow
					? colord(card.shadow).alpha(0.3).toRgbString()
					: undefined,
			}
			route.meta.data = data
		}
	}

	return route
}

export default defineConfig({
	resolve: {
		alias: {
			'~/': `${resolve(__dirname, 'src')}/`,
		},
	},
	plugins: [
		Vue({
			include: [/\.vue$/, /\.md$/],
		}),

		// https://github.com/hannoeru/vite-plugin-pages
		Pages({
			extensions: ['vue', 'md'],
			pagesDir: [{ dir: 'projects', baseRoute: '/projects' }, './src/pages'],
			extendRoute,
		}),

		// https://github.com/JohnCampionJr/vite-plugin-vue-layouts
		Layouts(),

		// https://github.com/antfu/unplugin-auto-import
		AutoImport({
			imports: ['vue', 'vue-router', '@vueuse/head', '@vueuse/core'],
			dts: 'src/auto-imports.d.ts',
		}),

		// https://github.com/antfu/unplugin-vue-components
		Components({
			// allow auto load markdown components under `./src/components/`
			extensions: ['vue', 'md'],

			// allow auto import and register components used in markdown
			include: [/\.vue$/, /\.vue\?vue/, /\.md$/],

			// custom resolvers
			resolvers: [
				// auto import icons
				// https://github.com/antfu/unplugin-icons
				IconsResolver({
					componentPrefix: '',
					enabledCollections: ['carbon', 'mdi'],
					customCollections: ['glyphs'],
				}),
			],
			dts: 'src/components.d.ts',
		}),

		// https://github.com/antfu/unplugin-icons
		Icons({
			autoInstall: true,
			customCollections: {
				glyphs: FileSystemIconLoader('./src/svg'),
			},
		}),

		// https://github.com/antfu/vite-plugin-windicss
		WindiCSS({
			safelist: markdownWrapperClasses,
		}),

		// https://github.com/antfu/vite-plugin-md
		// Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite
		Markdown({
			wrapperComponent: 'project-post',
			wrapperClasses: markdownWrapperClasses,
			headEnabled: true,
			markdownItSetup(md) {
				// https://prismjs.com/
				md.use(Prism)
				md.use(LinkAttributes, {
					pattern: /^https?:\/\//,
					attrs: {
						target: '_blank',
						rel: 'noopener',
					},
				})
			},
		}),

		// https://github.com/antfu/vite-plugin-inspect
		Inspect({
			// change this to enable inspect for debugging
			enabled: false,
		}),
	],

	server: {
		fs: {
			strict: true,
		},
	},

	// https://github.com/antfu/vite-ssg
	ssgOptions: {
		script: 'async',
		formatting: 'minify',
	},

	optimizeDeps: {
		include: ['vue', 'vue-router', '@vueuse/core', '@vueuse/head'],
		exclude: ['vue-demi'],
	},
})

import { ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

export interface ProjectData {
	id: string
	title: string
	background: string
	image?: string
	foreground?: string
	shadow?: string
}

import { ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

export type ProjectTag =
	| 'featured'
	| 'commercial'
	| 'personal'
	| 'open-source'
	| 'ui'
	| 'ux'
	| 'graphic'
	| 'dev'
	| 'branding'

export interface ProjectData {
	id: string
	title: string
	year: number
	tags: ProjectTag[]
	background: string
	image?: string
	foreground?: string
	shadow?: string
}

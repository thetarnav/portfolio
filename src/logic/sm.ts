import type { Component } from 'vue'
import GithubIcon from '~icons/mdi/github'
import CodepenIcon from '~icons/mdi/codepen'
import BehanceIcon from '~icons/mdi/behance'
import IGIcon from '~icons/mdi/instagram'
import DeviantartIcon from '~icons/mdi/deviantart'

export type SocialPlatforms =
	| 'github'
	| 'behance'
	| 'codepen'
	| 'ig'
	| 'deviantart'

const links: Record<SocialPlatforms, any> = {
	github: import.meta.env.VITE_SM_GITHUB,
	codepen: import.meta.env.VITE_SM_CODEPEN,
	behance: import.meta.env.VITE_SM_BEHANCE,
	ig: import.meta.env.VITE_SM_IG,
	deviantart: import.meta.env.VITE_SM_DEVIANTART,
}

const icons: Record<SocialPlatforms, Component> = {
	github: GithubIcon,
	codepen: CodepenIcon,
	behance: BehanceIcon,
	ig: IGIcon,
	deviantart: DeviantartIcon,
}

export const getIcon = (type: SocialPlatforms): Component => icons[type]
export const getHref = (type: SocialPlatforms): string => links[type]

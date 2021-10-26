import { Component } from 'vue'

import best from '~icons/glyphs/best'
import code from '~icons/glyphs/code'
import create from '~icons/glyphs/create'
import design from '~icons/glyphs/design'
import money from '~icons/glyphs/money'
import globe from '~icons/glyphs/globe'
import love from '~icons/glyphs/love'
import person from '~icons/glyphs/person'
import phone from '~icons/glyphs/phone'
import mail from '~icons/glyphs/mail'
import picture from '~icons/glyphs/picture'
import project from '~icons/glyphs/project'
import team from '~icons/glyphs/team'
import toTop from '~icons/glyphs/to-top'
import ui from '~icons/glyphs/ui'
import ux from '~icons/glyphs/ux'
import doc from '~icons/glyphs/document'
import text from '~icons/glyphs/text'

export type GlyphName =
	| 'best'
	| 'code'
	| 'create'
	| 'design'
	| 'document'
	| 'money'
	| 'globe'
	| 'love'
	| 'mail'
	| 'person'
	| 'phone'
	| 'picture'
	| 'project'
	| 'team'
	| 'text'
	| 'to-top'
	| 'ui'
	| 'ux'

const glyphComponents: Record<GlyphName, Component> = {
	best,
	code,
	create,
	design,
	money,
	globe,
	love,
	person,
	phone,
	picture,
	project,
	team,
	'to-top': toTop,
	ui,
	ux,
	document: doc,
	mail,
	text,
}

const getGlyph = (name: GlyphName): Component => glyphComponents[name]

export default getGlyph

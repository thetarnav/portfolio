import { ProjectTag } from '~/types'
import { GlyphName } from './glyphs'

const tagMap: Record<ProjectTag, { glyph: GlyphName; color: string }> = {
	featured: { glyph: 'love', color: '#DB2135' },
	commercial: { glyph: 'money', color: '#E1DE44' },
	personal: { glyph: 'person', color: '#B3AD98' },
	//TODO: create glyph for open-source
	'open-source': { glyph: 'love', color: '#B3AD98' },
	ui: { glyph: 'ui', color: '#F50062' },
	ux: { glyph: 'ux', color: '#2EC4B6' },
	graphic: { glyph: 'picture', color: '#F86624' },
	dev: { glyph: 'code', color: '#88DB2B' },
}

const getTagMeta = (tag: ProjectTag): { glyph: GlyphName; color: string } =>
	tagMap[tag]

export default getTagMeta

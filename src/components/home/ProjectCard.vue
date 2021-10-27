<script lang="ts" setup>
import { ProjectData } from '~/types'
import getGlyph from '~/logic/glyphs'
import getTagMeta from '~/logic/tags'

export interface ProjectCardData
	extends Pick<
		ProjectData,
		| 'id'
		| 'background'
		| 'image'
		| 'foreground'
		| 'shadow'
		| 'title'
		| 'year'
		| 'tags'
	> {}

const props = defineProps<{ data: ProjectCardData }>()
const { id, background, image, foreground, shadow, title, year, tags } =
	props.data
</script>

<template>
	<figure
		class="max-h-full flex flex-col justify-start items-stretch"
		:style="{ '--shadow': shadow } as any"
	>
		<p class="mb-2 ml-2 text-xs text-warm-gray-600 font-mono">
			<span class="bg-warm-gray-600 text-dark-900 py-0.5 px-1">{{
				year
			}}</span>
			{{ id.replace('projects-', '') }}
		</p>

		<div
			:style="{ 'background-color': background }"
			class="card relative"
			:class="{ withBackgroundImage: !!image }"
		>
			<img v-if="image" :src="image" />
			<div v-else class="h-64"></div>
			<div
				v-if="foreground"
				:style="{
					'background-image': `url('${foreground}')`,
				}"
				class="
					absolute
					-inset-6
					bg-contain bg-no-repeat
					pointer-events-none
				"
			></div>
		</div>
		<figcaption
			class="mt-4 pb-2 text-light-100 border-b"
			style="border-color: var(--shadow)"
		>
			<h3>{{ title }}</h3>
		</figcaption>

		<div class="-mt-px mr-2 flex justify-end space-x-2">
			<div
				v-for="tag in tags"
				:key="tag"
				:style="{ background: getTagMeta(tag).color }"
				class="w-6 h-6 center-child text-dark-900"
			>
				<component
					:is="getGlyph(getTagMeta(tag).glyph)"
					class="w-3 h-3"
					style="stroke-width: 2.3"
				/>
			</div>
		</div>
	</figure>
</template>

<style lang="scss" scoped>
.card {
	&.withBackgroundImage img {
		filter: drop-shadow(0 0 15px var(--shadow));
	}
	&:not(.withBackgroundImage) {
		box-shadow: 0 0 15px var(--shadow);
	}
}
</style>

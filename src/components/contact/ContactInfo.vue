<script lang="ts" setup>
import copy from 'copy-text-to-clipboard'
const { content } = defineProps<{
	content?: 'mail' | 'phone'
}>()

const slots = useSlots()

const handleCopyClick = () => {
	if (content === 'mail') return copy('gthetarnav@gmail.com')
	if (content === 'phone') return copy('+48505719499')
	const slotContent: string | undefined = slots.default?.()[0].el?.textContent
	slotContent && copy(slotContent)
}

const handleContentClick = () => {
	if (content === 'mail')
		return window.location.replace('mailto:gthetarnav@gmail.com')
	if (content === 'phone') return window.location.replace('tel:+48505719499')
}
</script>

<template>
	<div class="flex">
		<div
			class="
				h-10
				w-58
				flex
				items-center
				pl-3
				bg-dark-600
				border border-dark-200
				rounded
				font-mono
			"
			@click="handleContentClick"
		>
			<span v-if="content === 'mail'"> gthetarnav@gmail.com </span>
			<span v-else-if="content === 'phone'"> +48 505 719 499 </span>
			<span v-else>
				<slot />
			</span>
		</div>
		<button
			class="
				ml-2
				w-10
				h-10
				center-child
				bg-dark-400
				border border-dark-50
				rounded
			"
			@click="handleCopyClick"
		>
			<carbon:copy />
		</button>
	</div>
</template>

<style lang="scss"></style>

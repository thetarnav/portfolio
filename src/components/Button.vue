<script lang="ts" setup>
import type { Component } from '@vue/runtime-core'

defineProps<{
	icon?: Component
	iconLeft?: Component
	iconRight?: Component
	disabled?: boolean
}>()
</script>

<template>
	<button class="button-component" :class="{ icon }" :disabled="disabled">
		<component v-if="icon" :is="icon" />
		<template v-else>
			<component v-if="iconLeft" :is="iconLeft" />
			<span>
				<slot />
			</span>
			<component v-if="iconRight" :is="iconRight" />
		</template>
	</button>
</template>

<style lang="scss">
.button-component {
	@apply px-4 py-2 center-child space-x-2 bg-gray-400 text-dark-900 font-display font-bold rounded-md cursor-pointer;
	&.icon {
		@apply w-10 h-10 p-0;
	}
	&:disabled {
		@apply bg-gray-700 cursor-default;
	}
}
</style>

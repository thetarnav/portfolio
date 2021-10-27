<script lang="ts" setup>
import { RouterLink } from 'vue-router'
// @ts-ignore
import CarbonMenu from '~icons/carbon/menu'
</script>

<template>
	<nav class="navbar">
		<RouterLink to="/" class="left-group">
			<glyphs-logo />
			<p>thetarnav</p>
		</RouterLink>
		<div class="right-group">
			<RouterLink to="/contact">contact</RouterLink>
			<Button :icon="CarbonMenu" />
		</div>
	</nav>
</template>

<style lang="scss" scoped>
nav {
	@apply fixed inset-x-4 top-4 flex items-center justify-between;
}

.left-group {
	@apply flex items-center space-x-1 text-red-600 h6;
}
.right-group {
	@apply flex items-center space-x-4;
}
.icon-only {
	@apply border border-light-100;
}
</style>

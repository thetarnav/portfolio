<template>
	<div class="social-media">
		<SocialIconLink type="ig" />
		<SocialIconLink type="github" />
		<SocialIconLink type="codepen" />
		<SocialIconLink type="behance" />
		<SocialIconLink type="deviantart" />
	</div>
</template>

<style lang="scss" scoped>
.social-media {
	@apply flex items-center space-x-3 w-full mb-3;
	> * {
		@apply w-6 h-6;
	}
}
</style>

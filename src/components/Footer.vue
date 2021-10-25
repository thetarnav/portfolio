<template>
	<footer class="flex justify-between flex-wrap bg-dark-700 p-4 text-warm-gray-500">
		<div class="social-media">
			<SocialIconLink type="ig" />
			<SocialIconLink type="github" />
			<SocialIconLink type="codepen" />
			<SocialIconLink type="behance" />
			<SocialIconLink type="deviantart" />
		</div>
		<p class="text">© 2021 thetarnav</p>
		<p class="text">gthetarnav@gmail.com</p>
	</footer>
</template>

<style lang="scss" scoped>
.social-media {
	@apply flex space-x-3 w-full mb-3;
	> * {
		@apply w-6 h-6;
	}
}
.text {
	@apply font-mono text-xs;
}
</style>
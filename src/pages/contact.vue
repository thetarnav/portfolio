<template>
	<div class="mt-16">
		<h3 text="white" m="b-6">Let's create something, together!</h3>
		<ul class="flex flex-col space-y-3">
			<li>
				<ContactInfo content="mail" />
			</li>
			<li>
				<ContactInfo content="phone" />
			</li>
			<li>
				<SocialMediaList h="10" />
			</li>
		</ul>
	</div>
	<ContactForm />
</template>

<style lang="scss" scoped></style>

<route lang="yaml">
meta:
   layout: overlay
</route>

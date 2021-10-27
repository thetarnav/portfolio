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

	<form
		m="t-8 -x-4"
		p="4"
		class="bg-dark-800 flex flex-col"
		name="signup"
		method="POST"
		data-netlify="true"
		netlify-honeypot="bot-field"
	>
		<header m="b-4">
			<h4 text="white">Say what’s on your mind,</h4>
			<p>and get a quick response!</p>
		</header>
		<!-- honey-pot -->
		<p class="hidden">
			<label
				>Don’t fill this out if you’re human: <input name="bot-field"
			/></label>
		</p>

		<div class="input-group">
			<label for="email">Contact email</label>
			<input
				name="email"
				type="email"
				required
				placeholder="example@mail.com"
			/>
		</div>
		<div class="input-group">
			<label for="message">Your message</label>
			<textarea
				name="message"
				required
				placeholder="Hi, my name is..."
				rows="8"
				:resize="false"
			/>
		</div>
		<Button m="t-4">Send message</Button>
	</form>
</template>

<style lang="scss" scoped>
.input-group {
	@apply flex flex-col my-2;
	label {
		@apply text-sm;
	}
	textarea,
	input {
		@apply p-2 bg-dark-600 border border-dark-200 rounded;
		&::placeholder {
			@apply text-dark-50;
		}
	}
	textarea {
		@apply resize-y;
	}
}
</style>

<route lang="yaml">
meta:
   layout: overlay
</route>

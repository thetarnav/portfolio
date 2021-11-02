<script lang="ts" setup>
import NProgress from 'nprogress'

const isError = ref(false)
const isSuccess = ref(false)

const email = ref('')
const message = ref('')

const disabled = computed(
	() => !message.value.length || !email.value.length || isSuccess.value,
)

const handleSubmit = (e: Event) => {
	// Prevent sending multiple messages
	if (isSuccess.value) return

	isError.value = false
	NProgress.start()

	const form = e.target
	if (!form || !(form instanceof HTMLFormElement)) {
		isError.value = true
		NProgress.done()
		return
	}

	const formData = new FormData(form)

	try {
		fetch('/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams(formData as any).toString(),
		})
		isSuccess.value = true
	} catch (error) {
		isError.value = true
		console.error(error)
	}

	NProgress.done()
}
</script>

<template>
	<form
		ref="formEl"
		@submit.prevent="handleSubmit"
		name="signup"
		method="POST"
		data-netlify="true"
		netlify-honeypot="bot-field"
		m="t-8 -x-4"
		p="4 t-6"
		class="bg-dark-800 flex flex-col"
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
				v-model="email"
				name="email"
				type="email"
				required
				placeholder="example@mail.com"
			/>
		</div>
		<div class="input-group">
			<label for="message">Your message</label>
			<textarea
				v-model="message"
				name="message"
				required
				placeholder="Hi, my name is..."
				rows="8"
				:resize="false"
			/>
		</div>
		<Button m="t-4" :disabled="disabled">Send message</Button>
		<div h="14" class="flex items-center text-sm">
			<p v-if="isError" class="text-yellow-600">
				Sorry, there has been an issue sending the message, please try again
				later.
			</p>
			<p v-else-if="isSuccess" class="text-green-600">
				Your message has been sent!
			</p>
		</div>
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
		@apply p-2 bg-dark-600 border border-dark-200 rounded text-light-200;
		&::placeholder {
			@apply text-dark-50;
		}
	}
	textarea {
		@apply resize-y;
	}
}
</style>

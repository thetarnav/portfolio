<template>
	<div id="vue" class="counter">
		<h1>{{ msg }}</h1>
		<button @click="subtract()">-</button>
		<pre>{{ count }}</pre>
		<button @click="add()">+</button>
	</div>
</template>

<script lang="ts">
import { ref } from 'vue'
export default {
	props: {
		msg: String,
	},
	setup() {
		const count = ref(0)
		const add = () => (count.value = count.value + 1)
		const subtract = () => (count.value = count.value - 1)

		return {
			count,
			add,
			subtract,
		}
	},
}
</script>

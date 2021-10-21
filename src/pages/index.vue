<script setup lang="ts">
import { useUserStore } from '~/stores/user'

const user = useUserStore()
const name = ref(user.savedName)

const router = useRouter()
const go = () => {
	if (name.value)
		router.push(`/hi/${encodeURIComponent(name.value)}`)
}
</script>

<template>
	<div m="t-14">
		<div
			class="relative mx-auto w-24 h-24 p-3 flex flex-col items-center rounded-full bg-dark-700 text-white"
		>
			<glyphs-logo class="w-full h-full" />
			<h6 class="absolute h6 top-full -mt-3">thetarnav</h6>
		</div>
	</div>
	<div class="flex justify-between">
		<div m="t-4">
			<p>Hey, I am</p>
			<h3 text="white">
				Damian
				<br />Tarnawski,
			</h3>
		</div>
		<div class="mt-12 text-right">
			<p>a passionate</p>
			<h3 text="white">
				Designer
				<br />& Web Dev
			</h3>
		</div>
	</div>
	<div m="t-8 x-2">
		<p
			h="max-24"
			class="overflow-hidden"
			style="mask-image: linear-gradient(black 40%, transparent)"
		>Dreaming up ideas, architecting how would they look and function is where my passion lies. I’m especially interested in unique design systems, improving user experience, and making open source projects for fellow developers.</p>
		<a class="font-medium underline">Read more about me.</a>
	</div>
	<div m="x-2 t-8">
		<p>I’m available for hire/cooperation.</p>
		<button>
			Contact Me
			<carbon:chat />
		</button>
	</div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>

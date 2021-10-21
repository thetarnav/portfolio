<script setup lang="ts">
import { useUserStore } from '~/stores/user'
//@ts-ignore
import CarbonChat from '~icons/carbon/chat'
import ScrollToProjects from '~/components/home/ScrollToProjects.vue'

const user = useUserStore()
const name = ref(user.savedName)

const router = useRouter()
const go = () => {
	if (name.value)
		router.push(`/hi/${encodeURIComponent(name.value)}`)
}
</script>

<template>
	<div m="t-12">
		<div
			class="relative mx-auto w-24 h-24 p-3 flex flex-col items-center rounded-full text-white border border-red-700"
		>
			<glyphs-logo class="w-full h-full" />
			<h6 class="absolute h6 top-full -mt-3">thetarnav</h6>
		</div>
	</div>
	<header class="flex justify-between">
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
	</header>
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
		<div m="t-2" class="flex items-center space-x-4">
			<Button :icon-right="CarbonChat" class="bg-red-700">Contact Me</Button>
			<carbon:logo-github class="w-8 h-8" />
			<mdi:behance class="w-8 h-8" />
		</div>
	</div>
	<ScrollToProjects />
</template>

<route lang="yaml">
meta:
  layout: home
</route>

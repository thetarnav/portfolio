<script lang="ts" setup>
// @ts-ignore
import CarbonChat from '~icons/carbon/chat'
import { random } from 'lodash'
import { animate, AnimationControls } from 'motion'

const silhouette = ref<HTMLDivElement>()

let timeout: NodeJS.Timeout
let lastAnimation: AnimationControls

const animationStep = () => {
	timeout = setTimeout(() => {
		if (!silhouette.value) return
		lastAnimation?.stop()
		silhouette.value.style.opacity = '1'
		silhouette.value.style.transform = `translate(${random(
			-12,
			12,
		)}px, ${random(-12, 12)}px)`
		lastAnimation = animate(
			silhouette.value,
			{ opacity: 0 },
			{ duration: 1, delay: 0.1 },
		)
		animationStep()
	}, random(150, 700))
}

onMounted(() => animationStep())
onUnmounted(() => {
	clearTimeout(timeout)
	lastAnimation?.stop()
})
</script>

<template>
	<section class="mt-24">
		<h1 text="light-200">Let’s Collab&shy;orate</h1>
		<div w="58" m="t-8 x-auto">
			<p>
				Want to work together?
				<br />Awesome, let's get in touch!
			</p>
			<RouterLink to="/contact">
				<Button :icon-right="CarbonChat" class="mt-4 bg-red-600"
					>Contact Me</Button
				>
			</RouterLink>
			<div class="mt-4 flex space-x-2">
				<a href="https://github.com/thetarnav" target="_blank">
					<carbon:logo-github class="w-8 h-8" />
				</a>
				<a href="https://behance.net/damiantarnawski" target="_blank">
					<mdi:behance class="w-8 h-8" />
				</a>
			</div>
		</div>
	</section>
	<section m="-x-4 t-16" bg="dark-800" class="center-child">
		<div w="58" m="y-24" class="flex flex-col">
			<p class="relative z-10">/About me</p>
			<div class="relative h-64 flex">
				<glyphs:crossFrame class="absolute inset-0" />
				<div
					ref="silhouette"
					class="absolute w-full -inset-y-16"
					style="will-change: transform"
				>
					<glyphs:silhouetteFlat
						class="
							test-this
							absolute
							inset-0
							w-full
							h-full
							text-red-800
							opacity-90
						"
					/>
					<glyphs:silhouettePen
						class="absolute inset-0 w-full h-full text-dark-800"
					/>
				</div>
				<h1
					class="
						relative
						z-10
						m-auto
						text-right text-light-100
						normal-case
					"
				>
					More
					<br />About <br />Me
					<br />
					<svg
						class="inline-block w-10 h-10"
						viewBox="0 0 61 62"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<rect
							x="0.248734"
							y="50.7515"
							width="60"
							height="10"
							fill="currentColor"
						/>
						<rect
							x="60.2487"
							y="0.751465"
							width="60"
							height="10"
							transform="rotate(90 60.2487 0.751465)"
							fill="currentColor"
						/>
						<rect
							x="8.88791"
							y="2.81738"
							width="72.635"
							height="10"
							transform="rotate(45 8.88791 2.81738)"
							fill="currentColor"
						/>
					</svg>
				</h1>
			</div>
			<p class="text-right relative z-10">Learn More</p>
		</div>
	</section>
</template>

<style lang="scss" scoped>
// .test-this {
//    -webkit-mask-image: url("../../svg/silhouettePen.svg");
//    mask-image: url("../../svg/silhouettePen.svg");
// }
</style>

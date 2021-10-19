<script setup lang="ts">
import { useUserStore } from '~/stores/user'

const props = defineProps<{ name: string }>()
const router = useRouter()
const user = useUserStore()

watchEffect(() => {
	user.setNewName(props.name)
})
</script>

<template>
	<div>
		<p class="text-4xl">
			<carbon-pedestrian class="inline-block" />
		</p>
		<p>
			Hello {{ props.name }}
		</p>

		<p class="text-sm opacity-50">
			<em>This is a dynamic page</em>
		</p>

		<template v-if="user.otherNames.length">
			<p class="text-sm mt-4">
				<span class="opacity-75">aka:</span>
				<ul>
					<li v-for="otherName in user.otherNames" :key="otherName">
						<router-link :to="`/hi/${otherName}`" replace>
							{{ otherName }}
						</router-link>
					</li>
				</ul>
			</p>
		</template>

		<div>
			<button class="btn m-3 text-sm mt-6" @click="router.back()">Go back</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user'
import Ending from '~/components/home/Ending.vue'

const user = useUserStore()
const name = ref(user.savedName)

const router = useRouter()
const go = () => {
	if (name.value)
		router.push(`/hi/${encodeURIComponent(name.value)}`)
}
</script>

<template>
	<StartSection />
	<ProjectsSection />
	<Ending />
</template>

<route lang="yaml">
meta:
  layout: home
</route>

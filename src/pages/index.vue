<script setup lang="ts">
import { useUserStore } from '~/stores/user'
import StartSection from '~/components/home/StartSection.vue'
import ProjectsSection from '~/components/home/ProjectsSection.vue'

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
	<h1>Let’s Collaborate</h1>
</template>

<route lang="yaml">
meta:
  layout: home
</route>

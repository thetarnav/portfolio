<script setup lang='ts'>
import { isClient } from '@vueuse/core'

const route = useRoute()
const { frontmatter } = defineProps<{ frontmatter: any }>()

if (isClient) {
   const navigate = () => {
      if (location.hash) {
         document.querySelector(decodeURIComponent(location.hash))
            ?.scrollIntoView({ behavior: 'smooth' })
      }
   }

   useEventListener(window, 'hashchange', navigate, false)

   onMounted(() => {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
         anchor.addEventListener('click', (e) => {
            e.preventDefault()
            const href = anchor.getAttribute('href') as string
            history.replaceState({}, '', href)
            navigate()
         })
      })

      navigate()
      setTimeout(navigate, 500)
   })
}
</script>

<template>
   <div v-if="frontmatter.display ?? frontmatter.title" class="prose m-auto mb-8">
      <h1 class="mb-0">{{ frontmatter.display ?? frontmatter.title }}</h1>
   </div>
   <div class="bg-red-600">
      <slot />
   </div>
   <div v-if="route.path !== '/'" class="prose m-auto mt-8 mb-8">
      <router-link
         :to="route.path.split('/').slice(0, -1).join('/') || '/'"
         class="font-mono no-underline opacity-50 hover:opacity-75"
      >cd ..</router-link>
   </div>
</template>

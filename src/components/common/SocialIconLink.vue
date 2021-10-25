<script lang="ts" setup>
import type { SocialPlatforms } from '~/logic/sm'
import { getIcon, getHref } from '~/logic/sm'

defineProps<{
   type: SocialPlatforms
}>()
</script>

<template>
   <a :href="getHref(type)" target="_blank">
      <component :is="getIcon(type)" class="w-full h-full" />
   </a>
</template>
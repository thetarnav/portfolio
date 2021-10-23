<script lang="ts" setup>
import { colord } from 'colord'
import { isClient } from '@vueuse/core'

export interface ProjectCardData {
   id: string
   title: string
   background: string
   image?: string
   foreground?: string
   shadow?: string
}

const { shadow } = defineProps<ProjectCardData>()

// turn color value from project post to rgba, with applied transparency
const shadowColor = shadow ? colord(shadow).alpha(0.3).toRgbString() : undefined
</script>

<template>
   <figure class="max-h-full flex flex-col justify-start items-stretch">
      <div
         :style="{ 'background-color': background }"
         class="card relative rounded-md"
         :class="{ withBackgroundImage: !!image }"
      >
         <img v-if="image" :src="image" class="rounded-md" />
         <div v-else class="h-64"></div>
         <div
            v-if="foreground"
            :style="{
               'background-image': `url('${foreground}')`,
            }"
            class="absolute -inset-6 bg-contain bg-no-repeat"
         ></div>
      </div>
      <figcaption class="mt-3 pb-2 text-light-100 border-b" :style="`border-color: ${shadowColor}`">
         <h3 :style="`color: ${shadow}`">{{ title }}</h3>
      </figcaption>
      <p class="text-xs text-warm-gray-600">{{ id }}</p>
   </figure>
</template>

<style lang="scss" scoped>
.card {
   &.withBackgroundImage img {
      filter: drop-shadow(0 0 15px v-bind(shadowColor));
   }
   &:not(.withBackgroundImage) {
      box-shadow: 0 0 15px v-bind(shadowColor);
   }
}
</style>

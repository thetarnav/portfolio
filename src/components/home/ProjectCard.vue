<script lang="ts" setup>
import { colord } from 'colord'

export interface ProjectCardData {
   title: string
   background: string
   image?: string
   foreground?: string
   shadow?: string
}

const { shadow } = defineProps<ProjectCardData>()

// turn color value from project post to rgba, with applied transparency
const shadowColor = shadow ? colord(shadow).alpha(0.2).toRgbString() : undefined
</script>

<template>
   <div>
      <h3>{{ title }}</h3>
      <div
         :style="{ 'background-color': background }"
         class="card relative"
         :class="{ withBackgroundImage: !!image }"
      >
         <img v-if="image" :src="image" />
         <div v-else class="h-64"></div>
         <div
            v-if="foreground"
            :style="{
               'background-image': `url('${foreground}')`,
            }"
            class="absolute -inset-6 bg-contain bg-no-repeat"
         ></div>
      </div>
   </div>
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

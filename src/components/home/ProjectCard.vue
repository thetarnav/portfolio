<script lang="ts" setup>
export interface ProjectCardData {
   id: string
   title: string
   background: string
   image?: string
   foreground?: string
   shadow?: string
}

defineProps<ProjectCardData>()
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
      <figcaption class="mt-3 pb-2 text-light-100 border-b" :style="`border-color: ${shadow}`">
         <h3>{{ title }}</h3>
      </figcaption>
      <p class="text-xs text-warm-gray-600">{{ id }}</p>
   </figure>
</template>

<style lang="scss" scoped>
.card {
   &.withBackgroundImage img {
      filter: drop-shadow(0 0 15px v-bind(shadow));
   }
   &:not(.withBackgroundImage) {
      box-shadow: 0 0 15px v-bind(shadow);
   }
}
</style>

<script lang="ts" setup>import { ProjectData } from '~/types';

export interface ProjectCardData extends Pick<ProjectData, 'id' | 'background' | 'image' | 'foreground' | 'shadow' | 'title' | 'year' | 'tags'> { }

const props = defineProps<{ data: ProjectCardData }>()
const { id, background, image, foreground, shadow, title, year, tags } = props.data
</script>

<template>
   <figure
      class="max-h-full flex flex-col justify-start items-stretch"
      :style="{ '--shadow': shadow } as any"
   >
      <div class="m-2 flex justify-end space-x-2">
         <div v-for="tag in tags" :key="tag">
            <p class="text-xs font-mono text-gray-500">{{ tag }}</p>
         </div>
      </div>
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
      <figcaption class="mt-3 pb-2 text-light-100 border-b" style="border-color: var(--shadow)">
         <h3>{{ title }}</h3>
      </figcaption>
      <p class="text-xs text-warm-gray-600">{{ id }} --- {{ year }}</p>
   </figure>
</template>

<style lang="scss" scoped>
.card {
   &.withBackgroundImage img {
      filter: drop-shadow(0 0 15px var(--shadow));
   }
   &:not(.withBackgroundImage) {
      box-shadow: 0 0 15px var(--shadow);
   }
}
</style>

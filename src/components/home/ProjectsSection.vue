<script lang="ts" setup>
import { ProjectCardData } from './ProjectCard.vue'
import { Pagination, Swiper as SwiperInstance } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';

import type { ProjectData } from '~/types'

import 'swiper/css';

const router = useRouter()
// use frontmatter data in route meta to create projects list
const projects: ProjectCardData[] = router
   .getRoutes()
   .filter(
      i => i.path.startsWith('/projects') && Object.keys(i.meta).length !== 0,
   )
   .map(route => ((route.meta.data ?? {}) as ProjectData))

const swiperModules = [Pagination]

// swiper init
const onSwiper = (swiper: SwiperInstance) => {
   console.log(swiper);
};
const onSlideChange = () => {
   console.log('slide change');
};
</script>

<template>
   <section id="projects-section" class="min-h-screen">
      <ProjectsHeader p="t-12" m="b-6" />
      <swiper
         class="-mx-4 mb-20 overflow-visible"
         slides-per-view="auto"
         :space-between="70"
         :pagination="{ type: 'fraction' }"
         :modules="swiperModules"
         @swiper="onSwiper"
         @slideChange="onSlideChange"
      >
         <swiper-slide v-for="project in projects" :key="project.id">
            <div class="w-screen px-4 flex flex-col justify-center items-stretch">
               <ProjectCard :data="project" />
            </div>
         </swiper-slide>
      </swiper>
   </section>
</template>

<style lang="scss">
#projects-section {
   .swiper-slide {
      @apply h-auto flex items-center;
   }
   .swiper-pagination {
      @apply absolute top-full mt-6 inset-x-0 flex font-mono items-center justify-center space-x-2;
      @apply text-red-700 font-medium;
      .swiper-pagination-current {
      }
      .swiper-pagination-total {
         @apply px-2 bg-red-700 text-dark-900;
      }
      // .swiper-pagination-bullet {
      //    @apply w-4 h-4 bg-red-700 bg-opacity-20 rounded-full border border-red-700
      //       transition-colors;
      //    &-active {
      //       @apply bg-opacity-100;
      //    }
      // }
   }
}
</style>

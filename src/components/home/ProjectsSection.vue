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
         class="-mx-4 overflow-visible"
         slides-per-view="auto"
         :space-between="70"
         :pagination="{ clickable: true }"
         @swiper="onSwiper"
         @slideChange="onSlideChange"
      >
         <swiper-slide v-for="project in projects" :key="project.id">
            <div
               class="w-screen h-[calc(100vh-14rem)] px-4 flex flex-col justify-center items-stretch"
            >
               <ProjectCard
                  :id="project.id"
                  :title="project.title"
                  :background="project.background"
                  :image="project.image"
                  :foreground="project.foreground"
                  :shadow="project.shadow"
               />
            </div>
         </swiper-slide>
      </swiper>
   </section>
</template>

<style lang="scss">
</style>

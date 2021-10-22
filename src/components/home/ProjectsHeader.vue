<script lang="ts" setup>
const startVisible = ref(false),
   projectsVisible = ref(false)

const showFixed = computed(() => !projectsVisible.value && startVisible.value)

const scrollToProjects = () => {
   document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
   const projectsSection = document.getElementById('projects-section')
   const startSection = document.getElementById('start-section')
   useIntersectionObserver(startSection, ([{ isIntersecting }]) => startVisible.value = isIntersecting)
   useIntersectionObserver(projectsSection, ([{ isIntersecting }]) => projectsVisible.value = isIntersecting)
})

</script>

<template>
   <header>
      <h1 class="static-title" :class="{ 'hide': showFixed }">My Works</h1>
      <button class="sticky-wrapper" :class="{ 'hide': !showFixed }" @click="scrollToProjects">
         <div class="cover"></div>
         <h1 class="whitespace-nowrap opacity-40 select-none" style="font-weight: 760">My Works</h1>
         <div class="flex flex-col -space-y-9 opacity-40">
            <mdi:chevron-down class="arrow" />
            <mdi:chevron-down class="arrow" />
            <mdi:chevron-down class="arrow" />
         </div>
      </button>
   </header>
</template>

<style lang="scss" scoped>
.sticky-wrapper {
   @apply fixed z-10 -bottom-2 -inset-x-1.5 flex items-end text-warm-gray-400 outline-none;
   @apply transition-base duration-300;
   &.hide {
      @apply opacity-0 pointer-events-none transform translate-y-full;
   }
}
.static-title {
   @apply transition-base duration-700;
   &.hide {
      @apply opacity-0 transform -translate-x-24;
   }
}
.cover {
   @apply absolute -z-1 inset-x-1.5 bottom-2 h-32 bg-dark-900 pointer-events-none;
   -webkit-mask-image: linear-gradient(0deg, black 15%, transparent);
}
.arrow {
   @apply w-12 h-12;
}
</style>
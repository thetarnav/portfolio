<script lang="ts" setup>

</script>

<template>
   <div class="fixed z-10 -bottom-2.5 -inset-x-1.5 flex items-end text-warm-gray-400">
      <div class="cover"></div>
      <h1 class="uppercase whitespace-nowrap opacity-30" style="font-weight: 760">My Works</h1>
      <div class="flex flex-col -space-y-9 opacity-30">
         <mdi:chevron-down class="arrow" />
         <mdi:chevron-down class="arrow" />
         <mdi:chevron-down class="arrow" />
      </div>
   </div>
</template>

<style lang="scss" scoped>
.cover {
   @apply absolute -z-1 inset-x-1.5 bottom-2.5 h-48 bg-dark-900 pointer-events-none;
   -webkit-mask-image: linear-gradient(0deg, black 10%, transparent);
}
.arrow {
   @apply w-12 h-12;
   stroke-width: 1px;
}
</style>
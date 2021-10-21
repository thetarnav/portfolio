<script lang="ts" setup>

</script>

<template>
   <nav class="navbar">
      <div class="left-group">
         <glyphs-logo />
         <p>thetarnav</p>
      </div>
      <div class="right-group">
         <button>contact</button>
         <button class="icon-only">
            <carbon-menu />
         </button>
      </div>
   </nav>
</template>

<style lang="scss" scoped>
nav {
   @apply fixed inset-x-4 top-4 flex items-center justify-between;
}

.left-group {
   @apply flex items-center space-x-1 text-red-600 h6;
}
.right-group {
   @apply flex items-center space-x-4;
}
.icon-only {
   @apply w-10 h-10 center-child border border-light-100;
}
</style>

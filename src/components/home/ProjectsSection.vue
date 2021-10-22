<script lang="ts" setup>
import { ProjectCardData } from './ProjectCard.vue'

const defaultProps = () => ({
   title: 'Project',
   background: '#eee',
})

const router = useRouter()
// use frontmatter data in route meta to create projects list
const projects: ProjectCardData[] = router
   .getRoutes()
   .filter(
      i => i.path.startsWith('/projects') && Object.keys(i.meta).length !== 0,
   )
   .map(route => {
      const frontmatter = route.meta.frontmatter as
         | undefined
         | Record<string, any>
      if (!frontmatter) return defaultProps()
      const { title, card } = frontmatter
      return {
         title: title || defaultProps().title,
         background: card?.background || defaultProps().background,
         image: card?.image,
         foreground: card?.foreground,
         shadow: card?.shadow,
      }
   })
</script>

<template>
   <section id="projects-section" class="min-h-screen">
      <ProjectsHeader p="t-12" />
      <ul class="space-y-4">
         <li v-for="(project, i) in projects" :key="i">
            <ProjectCard
               :title="project.title"
               :background="project.background"
               :image="project.image"
               :foreground="project.foreground"
               :shadow="project.shadow"
            />
         </li>
      </ul>
   </section>
</template>

<style lang="scss">
</style>

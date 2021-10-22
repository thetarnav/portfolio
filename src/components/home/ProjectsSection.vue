<script lang="ts" setup>
import ProjectsHeader from './ProjectsHeader.vue'

interface Project {
   title: string
}

const defaultProps = () => ({
   title: 'Project'
})

const router = useRouter()
// use frontmatter data in route meta to create projects list
const projects: Project[] = router.getRoutes()
   .filter(i => i.path.startsWith('/projects') && Object.keys(i.meta).length !== 0)
   .map(route => {
      const frontmatter = route.meta.frontmatter as undefined | Record<string, any>
      if (!frontmatter) return defaultProps()
      const { title } = frontmatter
      return {
         title: typeof title === 'string' ? title : defaultProps().title
      }
   })

</script>

<template>
   <section id="projects-section" class="min-h-screen">
      <ProjectsHeader p="t-12" />
      <ul class="space-y-4">
         <li v-for="(project, i) in projects" :key="i">
            <h3>{{ project.title }}</h3>
         </li>
      </ul>
   </section>
</template>

<style lang="scss">
</style>
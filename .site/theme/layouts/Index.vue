<script setup lang="ts">
import { computed } from 'vue'
import { usePageData, usePageFrontmatter } from '@vuepress/client'
import { useScrollPromise } from '@vuepress/theme-default/lib/client/composables'
import type { DefaultThemePageFrontmatter } from '@vuepress/theme-default/lib/shared'

import Navbar from '../components/NavBar.vue'
import Page from '@vuepress/theme-default/lib/client/components/Page.vue'


const page = usePageData()
const frontmatter = usePageFrontmatter<DefaultThemePageFrontmatter>()

// classes
const containerClass = computed(() => [
  'no-sidebar',
  frontmatter.value.pageClass,
])

// handle scrollBehavior with transition
const scrollPromise = useScrollPromise()
const onBeforeEnter = scrollPromise.resolve
const onBeforeLeave = scrollPromise.pending
</script>

<template>
  <div class="theme-container" :class="containerClass">

    <slot name="navbar">
      <Navbar>
        <template #before>
          <slot name="navbar-before" />
        </template>
        <template #after>
          <slot name="navbar-after" />
        </template>
      </Navbar>
    </slot>

    <slot name="page">
      <Transition name="fade-slide-y" mode="out-in" @before-enter="onBeforeEnter" @before-leave="onBeforeLeave">
        <Page :key="page.path">
          <template #top>
            <slot name="page-top" />
          </template>
          <template #content-top>
            <slot name="page-content-top" />
          </template>
          <template #content-bottom>
            <slot name="page-content-bottom" />
          </template>
          <template #bottom>
            <slot name="page-bottom" />
          </template>
        </Page>
      </Transition>
    </slot>

  </div>
</template>

<style scoped>
.toggle-sidebar-button {
  display: none;
}
</style>

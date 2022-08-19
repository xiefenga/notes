<script lang="ts" setup>
import { useRoute } from 'vue-router'
// @ts-ignore
import pathTree, { FileItem } from '@temp/category.json'
import { ref, computed, watch } from 'vue'

import Index from './Index.vue'
import DirList from '../components/DirList.vue'

const route = useRoute()

const getChildren = (path: string, start: FileItem): FileItem[] => {
  if (start.path === path) {
    return (pathTree.children ?? [])
  } else {
    for (const cursor of start.children) {
      if (cursor.path === path) {
        // console.log(cursor.path)
        return cursor.children
      } else if (path.includes(`${cursor.path}/`)) {
        // console.log(cursor.path)
        return getChildren(path, cursor)
      }
      // console.log(cursor.path)
    }
    return []
  }
}

// interface ListItem extends FileItem {
//   text: string
//   link: string
// }

const list = ref([])

const currentPath = computed(() => decodeURIComponent(
  route.path.length > 1 && route.path.endsWith('/') ? route.path.slice(0, -1) : route.path
))

watch(route, () => {
  list.value = getChildren(currentPath.value, pathTree)
    .map(item => ({ ...item, text: item.name, link: item.path }))
})

</script>

<template>
  <Index>
    <template #page-content-top>
      <div class="current-path">{{ currentPath }}</div>
    </template>
    <template #page-content-bottom>
      <dir-list :list="list" />
    </template>
  </Index>
</template>

<style scoped>
.current-path {
  text-align: center;
  font-size: 28px;
  line-height: 2;
  position: fixed;
  left: 50%;
  top: 0;
  transform: translate(-50%, 0);
  z-index: 9999;
  user-select: none;
}
</style>
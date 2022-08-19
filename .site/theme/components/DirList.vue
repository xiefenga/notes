<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { FileItem } from '@temp/category.json'

interface ListItem extends FileItem {
  text: string
  link: string
}

const props = defineProps<{
  list: ListItem[]
}>()

const { list } = toRefs(props)

const dirs = computed(() => list.value.filter(item => item.type === 'dir'))

const files = computed(() => list.value.filter(item => item.type === 'file'))

</script>

<template>
  <div style="padding: 20px 0;"></div>
  <div class="list-container">
    <div class="list-item" v-for="item in dirs">
      <router-link :to="item.link">
        {{ item.text }}
      </router-link>
    </div>
  </div>
  <div v-if="!!dirs.length" class="divider"></div>
  <div class="list-container file-list">
    <div class="list-item" v-for="item in files">
      <router-link :to="`${item.link}${item.ext === '.md' ? '.html' : item.ext}`">
        {{ item.text }}
      </router-link>
    </div>
  </div>
</template>

<style>
.list-container::after {
  content: '';
  display: block;
  clear: both;
}

.list-container .list-item {
  float: left;
  height: 50px;
  text-align: center;
  line-height: 50px;
  padding: 0 20px;
  background-color: rgb(218, 226, 228);
  border-radius: 10px;
  margin: 10px;
}

.divider {
  border-bottom: 1px dashed #aaa;
  margin: 20px 0;
}

/* .file-list {} */
</style>
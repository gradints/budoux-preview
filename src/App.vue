<script setup lang="ts">
import { computed, ref } from 'vue'
import ResizableDiv from './ResizableDiv.vue';
import { loadDefaultJapaneseParser } from 'budoux'


const text = ref('')
const parser = loadDefaultJapaneseParser();

const html = computed(() => {
  return parser.parse(text.value).join("<wbr>")
})
</script>

<template>
  <div class="flex h-screen min-h-800px py-8">
    <div class="px-8 w-480px flex flex-col">
      <div class="mb-4">
        <div class="py-2 text-blue-500">Insert Japanese Text Here</div>
        <textarea
          v-model="text"
          class="rounded-lg px-4 pt-2 pb-4 w-full bg-gray-700 text-white focus:outline-none"
          placeholder="Input japanese text here" rows="12"></textarea>
      </div>
      <div class="flex-1 flex flex-col">
        <div class="py-2 text-blue-500">Output</div>
        <div class="bg-gray-800 text-white p-4 rounded-lg flex-1">
          {{ html }}
        </div>
      </div>
    </div>
    <resizable-div :html="html"></resizable-div>
  </div>
</template>

<style lang="postcss" scoped>
</style>

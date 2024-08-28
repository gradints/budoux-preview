<script setup lang="ts">
  import { loadDefaultJapaneseParser } from 'budoux'
  import { computed, ref } from 'vue'
  import ResizableDiv from './ResizableDiv.vue'

  const text = ref('')
  const parser = loadDefaultJapaneseParser()

  const parserResult = computed(() => parser.parse(text.value))
  const html = computed(() => parserResult.value.join('<wbr>'))
  const htmlOutput = computed(() => parserResult.value.join('\n<wbr>\n'))
</script>

<template>
  <div class="h-screen min-h-800px flex py-8">
    <div class="w-480px flex flex-col px-8">
      <div class="mb-4">
        <div class="py-2 text-blue-500">
          Insert Japanese Text Here
        </div>
        <textarea
          v-model="text"
          class="w-full rounded-lg bg-gray-700 px-4 pb-4 pt-2 text-white focus:outline-none"
          placeholder="Input japanese text here"
          rows="12"></textarea>
      </div>
      <div class="flex flex-1 flex-col">
        <div class="py-2 text-blue-500">
          Output
        </div>
        <textarea
          :value="htmlOutput"
          readonly
          class="flex-1 rounded-lg bg-gray-800 p-4 text-white focus:outline-none"
          placeholder="Input japanese text here"></textarea>
      </div>
    </div>
    <resizable-div :html="html"></resizable-div>
  </div>
</template>

<style lang="postcss" scoped>
</style>

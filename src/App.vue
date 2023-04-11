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
  <div class="flex h-screen min-h-800px py-8">
    <div class="px-8 w-480px flex flex-col">
      <div class="mb-4">
        <div class="py-2 text-blue-500">
          Insert Japanese Text Here
        </div>
        <textarea
          v-model="text"
          class="rounded-lg px-4 pt-2 pb-4 w-full bg-gray-700 text-white focus:outline-none"
          placeholder="Input japanese text here"
          rows="12"></textarea>
      </div>
      <div class="flex-1 flex flex-col">
        <div class="py-2 text-blue-500">
          Output
        </div>
        <textarea
          :value="htmlOutput"
          readonly
          class="bg-gray-800 text-white flex-1 p-4 rounded-lg focus:outline-none"
          placeholder="Input japanese text here"></textarea>
      </div>
    </div>
    <resizable-div :html="html" />
  </div>
</template>

<style lang="postcss" scoped>
</style>

<script setup lang="ts">
import { ref } from 'vue'
import ResizableDiv from './ResizableDiv.vue';
const text = ref('')
</script>

<template>
  <div class="flex flex-col h-screen min-h-800px">
    <div class="w-full max-w-screen-md px-8 mx-auto py-8">
      <textarea v-model="text" class="rounded-lg px-4 pt-2 pb-4 w-full" placeholder="Input japanese text here" rows="5"></textarea>
    </div>
    <resizable-div :html="text"></resizable-div>
  </div>
</template>

<style lang="postcss" scoped>
</style>

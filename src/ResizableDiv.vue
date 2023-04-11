<script setup lang="ts">
  // https://htmldom.dev/create-resizable-split-views/
  import { onBeforeUnmount, onMounted, ref } from 'vue'

  defineProps<{
    html: string,
  }>()

  // Query the element
  let resizer: HTMLElement|null
  let previewDiv: HTMLElement|null

  // The current position of mouse
  let x = 0
  // let y = 0

  // Width of left side
  let previewWidth = 0

  // Handle the mousedown event that's triggered when user drags the resizer
  const mouseDownHandler = function (e: MouseEvent) {
    // Get the current mouse position
    x = e.clientX
    // y = e.clientY
    previewWidth = previewDiv?.getBoundingClientRect().width ?? 0

    // Attach the listeners to `document`
    document.addEventListener('mousemove', mouseMoveHandler)
    document.addEventListener('mouseup', mouseUpHandler)
  }

  const mouseMoveHandler = function (e: MouseEvent) {
    if (previewDiv && resizer) {
      // How far the mouse has been moved
      // Multyply by 2 because the resize is both left and right
      const dx = (e.clientX - x) * 2

      // add the mouse offset to the width of the preview
      previewDiv.style.width = `${previewWidth + dx}px`

      // When user moves the resizer, we should update its cursor
      document.body.style.cursor = 'ew-resize'

      // We also prevent the mouse events and text selection in both sides
      previewDiv.style.userSelect = 'none'
      previewDiv.style.pointerEvents = 'none'
    }
  }

  const mouseUpHandler = function () {
    // These styles are removed right after the user stops moving the mouse:
    resizer?.style.removeProperty('cursor')
    document.body.style.removeProperty('cursor')

    previewDiv?.style.removeProperty('user-select')
    previewDiv?.style.removeProperty('pointer-events')


    // Remove the handlers of `mousemove` and `mouseup`
    document.removeEventListener('mousemove', mouseMoveHandler)
    document.removeEventListener('mouseup', mouseUpHandler)
  }

  onMounted(() => {
    resizer = document.getElementById('resizer')
    previewDiv = document.getElementById('preview')

    // Attach the handler
    resizer?.addEventListener('mousedown', mouseDownHandler)
  })
  onBeforeUnmount(() => {
    if (resizer) {
      resizer.removeEventListener('mousedown', mouseDownHandler)
    }
  })

  const width = ref(0)
  setInterval(() => {
    width.value = document.getElementById('preview')?.clientWidth ?? 0
  }, 100)
</script>

<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="flex-1 flex flex-col">
    <div class="text-center text-white py-2">
      Width:
      <span class="text-blue-500">{{ width }}px</span>
    </div>
    <div class="flex justify-center flex-1">
      <div
        id="preview"
        class="text-white bg-gray-800 break-keep break-words py-4 px-2"
        style="width: 400px"
        v-html="html"></div>
      <div id="resizer" class="cursor-ew-resize w-4 p-1 z-10 -mx-1 bg-gray-800 hover:bg-gray-700 flex items-center justify-center">
        <svg class="fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M32 32c-8.8 0-16 7.2-16 16l0 416c0 8.8 7.2 16 16 16s16-7.2 16-16L48 48c0-8.8-7.2-16-16-16zm128 0c-8.8 0-16 7.2-16 16l0 416c0 8.8 7.2 16 16 16s16-7.2 16-16l0-416c0-8.8-7.2-16-16-16z" /></svg>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
</style>
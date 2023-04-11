<script setup lang="ts">
  // https://htmldom.dev/create-resizable-split-views/
  import { ref, onMounted, onBeforeUnmount } from 'vue'

  const props = defineProps<{
    html: string
  }>()

  const resizer = ref(null)

  // Query the element
  let leftSide = null

  // The current position of mouse
  let x = 0
  // let y = 0

  // Width of left side
  let leftWidth = 0

  // Handle the mousedown event that's triggered when user drags the resizer
  const mouseDownHandler = function (e) {
    // Get the current mouse position
    x = e.clientX
    // y = e.clientY
    leftWidth = leftSide.getBoundingClientRect().width

    // Attach the listeners to `document`
    document.addEventListener('mousemove', mouseMoveHandler)
    document.addEventListener('mouseup', mouseUpHandler)
  }

  const mouseMoveHandler = function (e) {
    // How far the mouse has been moved
    const dx = e.clientX - x
    // const dy = e.clientY - y

    const newLeftWidth = ((leftWidth + dx) * 100) / resizer.value.parentNode.getBoundingClientRect().width
    leftSide.style.width = `${newLeftWidth}%`

    // When user moves the resizer, we should update its cursor
    document.body.style.cursor = 'ew-resize'

    // We also prevent the mouse events and text selection in both sides
    leftSide.style.userSelect = 'none'
    leftSide.style.pointerEvents = 'none'
  }

  const mouseUpHandler = function () {
    // These styles are removed right after the user stops moving the mouse:
    resizer.value.style.removeProperty('cursor')
    document.body.style.removeProperty('cursor')

    leftSide.style.removeProperty('user-select')
    leftSide.style.removeProperty('pointer-events')


    // Remove the handlers of `mousemove` and `mouseup`
    document.removeEventListener('mousemove', mouseMoveHandler)
    document.removeEventListener('mouseup', mouseUpHandler)
  }

  onMounted(() => {
    leftSide = resizer.value.previousElementSibling

    // Attach the handler
    resizer.value.addEventListener('mousedown', mouseDownHandler)
  })
  onBeforeUnmount(() => {
    resizer.value.removeEventListener('mousedown', mouseDownHandler)
  })
</script>

<template>
  <div class="flex-1 flex justify-center h-full">
    <div class="text-white bg-gray-800 break-keep break-words py-4 px-2" id="preview" v-html="html" style="width: 400px"></div>
    <div ref="resizer" class="cursor-ew-resize w-4 p-1 z-10 -mx-1 bg-gray-800 hover:bg-gray-700 flex items-center justify-center">
      <svg class="fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M32 32c-8.8 0-16 7.2-16 16l0 416c0 8.8 7.2 16 16 16s16-7.2 16-16L48 48c0-8.8-7.2-16-16-16zm128 0c-8.8 0-16 7.2-16 16l0 416c0 8.8 7.2 16 16 16s16-7.2 16-16l0-416c0-8.8-7.2-16-16-16z"/></svg>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
</style>
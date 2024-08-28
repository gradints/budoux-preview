import transformerDirectives from '@unocss/transformer-directives'
import { defineConfig } from 'unocss'
import presetUno from 'unocss/preset-uno'

export default defineConfig({
  presets: [
    presetUno(),
  ],
  transformers: [
    transformerDirectives(), // enable @apply for css
  ],
})

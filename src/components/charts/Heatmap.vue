<template>
  <canvas ref="canvas" width="520" height="180" />
</template>
<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
const props = defineProps<{ data: { value: number }[] }>()
const canvas = ref<HTMLCanvasElement | null>(null)
function getColor(v: number, min: number, max: number) {
  const t = (v - min) / (max - min || 1)
  const r = Math.round(255 * t)
  const b = Math.round(255 * (1 - t))
  return `rgb(${r},60,${b})`
}
function draw() {
  const c = canvas.value
  if (!c || !props.data.length) return
  const ctx = c.getContext('2d')!
  ctx.clearRect(0, 0, c.width, c.height)
  const values = props.data.map(d => d.value)
  const minY = Math.min(...values)
  const maxY = Math.max(...values)
  const side = Math.max(2, Math.floor((c.width - 40) / Math.sqrt(props.data.length)))
  let i = 0
  for (let row = 0; row < Math.sqrt(props.data.length); row++) {
    for (let col = 0; col < Math.sqrt(props.data.length); col++) {
      if (i >= props.data.length) break
      const v = props.data[i].value
      ctx.fillStyle = getColor(v, minY, maxY)
      ctx.fillRect(col * side + 20, row * side + 10, side, side)
      i++
    }
  }
}
onMounted(draw)
watch(() => props.data, draw)
</script>

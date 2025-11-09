<template>
  <canvas ref="canvas" width="520" height="180" />
</template>
<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
const props = defineProps<{ data: { value: number }[] }>()
const canvas = ref<HTMLCanvasElement | null>(null)
function draw() {
  const c = canvas.value
  if (!c || !props.data.length) return
  const ctx = c.getContext('2d')!
  ctx.clearRect(0, 0, c.width, c.height)
  const values = props.data.map(d => d.value)
  const minY = Math.min(...values)
  const maxY = Math.max(...values)
  ctx.fillStyle = '#3ec47a'
  props.data.forEach((point, i) => {
    const x = (i / (values.length - 1)) * (c.width - 40) + 20
    const y = 160 - ((point.value - minY) / (maxY - minY || 1)) * 140 + 10
    ctx.beginPath()
    ctx.arc(x, y, 2.5, 0, Math.PI * 2)
    ctx.fill()
  })
}
onMounted(draw)
watch(() => props.data, draw)
</script>

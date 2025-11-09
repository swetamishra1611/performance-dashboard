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
  const barW = Math.max(2, (c.width - 40) / props.data.length)
  ctx.fillStyle = '#f59e42'
  props.data.forEach((point, i) => {
    const x = 20 + i * barW
    const y = 160 - ((point.value - minY) / (maxY - minY || 1)) * 140 + 10
    const h = 160 - y
    ctx.fillRect(x, y, barW - 1, h)
  })
}
onMounted(draw)
watch(() => props.data, draw)
</script>

<template>
  <div>
    <canvas ref="canvas" width="600" height="300" style="border:1px solid #ccc"></canvas>
  </div>
</template>

<script>
export default {
  name: "LineChart",
  data() {
    return {
      data: []
    }
  },
  mounted() {
    this.generateData()
    this.drawChart()
    
    // Update every 100ms (10 times per second for real-time feel)
    this.intervalId = setInterval(() => {
      this.generateData()
      requestAnimationFrame(() => this.drawChart())
    }, 100)
  },
  beforeUnmount() {
    clearInterval(this.intervalId)
  },
  methods: {
    generateData() {
      this.data = Array.from({ length: 50 }, (_, i) => ({
        x: i * 12,
        y: 150 + Math.sin(i / 5) * 80 + Math.random() * 20
      }))
    },
    drawChart() {
      const canvas = this.$refs.canvas
      const ctx = canvas.getContext("2d")
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.beginPath()
      ctx.moveTo(this.data[0].x, this.data[0].y)
      this.data.forEach(point => ctx.lineTo(point.x, point.y))
      ctx.strokeStyle = "#3b82f6"
      ctx.lineWidth = 2
      ctx.stroke()
    }
  }
}
</script>

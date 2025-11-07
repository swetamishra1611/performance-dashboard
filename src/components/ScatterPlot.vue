<template>
  <div>
    <canvas ref="canvas" width="400" height="200" style="border:1px solid #ccc"></canvas>
  </div>
</template>

<script>
export default {
  name: "ScatterPlot",
  data() {
    return {
      points: []
    }
  },
  mounted() {
    this.generatePoints()
    this.drawChart()
    
    this.intervalId = setInterval(() => {
      this.generatePoints()
      requestAnimationFrame(() => this.drawChart())
    }, 100)
  },
  beforeUnmount() {
    clearInterval(this.intervalId)
  },
  methods: {
    generatePoints() {
      this.points = Array.from({ length: 30 }, () => ({
        x: Math.random() * 400,
        y: Math.random() * 200
      }))
    },
    drawChart() {
      const canvas = this.$refs.canvas
      const ctx = canvas.getContext("2d")
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "#f6943b"
      
      this.points.forEach(point => {
        ctx.beginPath()
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2)
        ctx.fill()
      })
    }
  }
}
</script>

<template>
  <div>
    <canvas ref="canvas" width="400" height="200" style="border:1px solid #ccc"></canvas>
  </div>
</template>

<script>
export default {
  name: "BarChart",
  data() {
    return {
      data: []
    }
  },
  mounted() {
    this.generateData()
    this.drawChart()
    
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
      this.data = Array.from({ length: 10 }, () => Math.round(Math.random() * 200))
    },
    drawChart() {
      const canvas = this.$refs.canvas
      const ctx = canvas.getContext("2d")
      const barCount = 10
      const barWidth = 30
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "#82d616"
      
      this.data.forEach((val, i) => {
        ctx.fillRect(i * (barWidth + 5) + 10, canvas.height - val - 20, barWidth, val)
      })
    }
  }
}
</script>

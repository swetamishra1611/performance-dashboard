<template>
  <div>
    <canvas ref="canvas" width="400" height="150" style="border:1px solid #ccc"></canvas>
  </div>
</template>

<script>
export default {
  name: "Heatmap",
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
      const cols = 8
      const rows = 5
      this.data = []
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          this.data.push(Math.floor(Math.random() * 255))
        }
      }
    },
    drawChart() {
      const canvas = this.$refs.canvas
      const ctx = canvas.getContext("2d")
      const cols = 8
      const rows = 5
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      let index = 0
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const val = this.data[index] || 0
          ctx.fillStyle = `rgb(${val}, ${255 - val}, ${Math.floor(val / 2)})`
          ctx.fillRect(i * 50, j * 30, 45, 25)
          index++
        }
      }
    }
  }
}
</script>

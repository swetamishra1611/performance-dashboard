<template>
  <div style="position:fixed;top:10px;right:10px;background:rgba(0,0,0,0.8);color:#0f0;padding:10px;border-radius:5px;font-family:monospace;font-size:14px;z-index:9999;">
    <div>FPS: {{ fps }}</div>
    <div>Memory: {{ memory }} MB</div>
  </div>
</template>

<script>
export default {
  name: "PerformanceMonitor",
  data() {
    return {
      fps: 0,
      memory: 0,
      frameCount: 0,
      lastTime: performance.now()
    }
  },
  mounted() {
    this.startMonitoring()
  },
  beforeUnmount() {
    cancelAnimationFrame(this.rafId)
  },
  methods: {
    startMonitoring() {
      const measure = () => {
        this.frameCount++
        const currentTime = performance.now()
        
        // Calculate FPS every second
        if (currentTime >= this.lastTime + 1000) {
          this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime))
          this.frameCount = 0
          this.lastTime = currentTime
          
          // Get memory usage if available
          if (performance.memory) {
            this.memory = (performance.memory.usedJSHeapSize / 1048576).toFixed(1)
          }
        }
        
        this.rafId = requestAnimationFrame(measure)
      }
      
      measure()
    }
  }
}
</script>

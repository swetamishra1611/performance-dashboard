<script setup>
import { ref } from 'vue'
import TimeRangeSelector from './components/TimeRangeSelector.vue'
import DataTable from './components/DataTable.vue'
import LineChart from './components/LineChart.vue'
import BarChart from './components/BarChart.vue'
import ScatterPlot from './components/ScatterPlot.vue'
import Heatmap from './components/Heatmap.vue'
import PerformanceMonitor from './components/PerformanceMonitor.vue'

const currentRange = ref('short')
const chartData = ref(Array.from({ length: 50 }, () => Math.floor(Math.random()*100)))

function handleRangeChange(range) {
  currentRange.value = range
  if (range === 'short')
    chartData.value = Array.from({ length: 50 }, () => Math.floor(Math.random()*100))
  else if (range === 'medium')
    chartData.value = Array.from({ length: 200 }, () => Math.floor(Math.random()*100))
  else
    chartData.value = Array.from({ length: 1000 }, () => Math.floor(Math.random()*100))
}
</script>

<template>
  <PerformanceMonitor />
  
  <div class="container">
    <h1>Welcome, Sweta! --------</h1>
    
    <TimeRangeSelector @rangeSelected="handleRangeChange" />
    
    <!-- Charts Section - 2x2 Grid Layout -->
    <div class="charts-grid">
      <div class="chart-card">
        <h3>Line Chart</h3>
        <LineChart />
      </div>
      
      <div class="chart-card">
        <h3>Bar Chart</h3>
        <BarChart />
      </div>
      
      <div class="chart-card">
        <h3>Scatter Plot</h3>
        <ScatterPlot />
      </div>
      
      <div class="chart-card">
        <h3>Heatmap</h3>
        <Heatmap />
      </div>
    </div>
    
    <!-- Data Table Section -->
    <div class="table-section">
      <h3>Data Table</h3>
      <DataTable :data="chartData" />
    </div>
    
    <p class="description">This will be your performance-critical data visualization dashboard.</p>
  </div>
</template>

<style scoped>
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #1a1a1a;
  color: white;
  font-family: Arial, sans-serif;
}

h1 {
  color: #3b82f6;
  text-align: center;
  margin-top: 40px;
  margin-bottom: 30px;
  font-size: 2.5em;
  letter-spacing: 2px;
}

h3 {
  color: #3b82f6;
  text-align: center;
  font-size: 1.2em;
  margin-bottom: 15px;
}

/* Charts Grid Layout - 2x2 */
.charts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin: 40px 0;
  padding: 20px;
  background-color: #0f0f0f;
  border-radius: 8px;
}

.chart-card {
  background-color: #1a1a1a;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #333;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.chart-card:hover {
  border-color: #3b82f6;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}

.chart-card canvas {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}

/* Table Section */
.table-section {
  margin-top: 40px;
  padding: 20px;
  background-color: #0f0f0f;
  border-radius: 8px;
  border: 1px solid #333;
}

.description {
  text-align: center;
  font-size: 1.1em;
  color: #999;
  margin-top: 30px;
  padding-bottom: 20px;
}

/* Responsive Design - Tablet */
@media (max-width: 1024px) {
  .charts-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  h1 {
    font-size: 2em;
  }
  
  .container {
    padding: 15px;
  }
}

/* Responsive Design - Mobile */
@media (max-width: 768px) {
  .charts-grid {
    grid-template-columns: 1fr;
    gap: 15px;
    margin: 20px 0;
    padding: 10px;
  }
  
  .chart-card {
    padding: 15px;
  }
  
  h1 {
    font-size: 1.5em;
    margin-top: 20px;
  }
  
  h3 {
    font-size: 1em;
    margin-bottom: 10px;
  }
  
  .container {
    padding: 10px;
  }
  
  .description {
    font-size: 0.9em;
  }
}

/* Responsive Design - Very Small Screens */
@media (max-width: 480px) {
  h1 {
    font-size: 1.2em;
    margin-top: 15px;
    margin-bottom: 15px;
  }
  
  .charts-grid {
    gap: 10px;
    margin: 15px 0;
  }
  
  .chart-card {
    padding: 10px;
  }
  
  .container {
    padding: 8px;
  }
}

/* Canvas optimization */
canvas {
  image-rendering: crisp-edges;
  image-rendering: pixelated;
}
</style>

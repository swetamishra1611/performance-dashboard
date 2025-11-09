<template>
  <div class="dashboard">
    <!-- Header with Performance Monitor -->
    <header class="dashboard-header">
      <h1>Performance Dashboard</h1>
      <div class="header-controls">
        <!-- Enhanced Performance Monitor -->
        <div class="perf-monitor">
          <div class="perf-item">
            <span class="perf-label">FPS:</span>
            <span class="perf-value" :style="{
              color: fps >= 50 ? '#4ade80' : fps >= 30 ? '#fbbf24' : '#ef4444'
            }">{{ fps }}</span>
          </div>
          <div class="perf-item">
            <span class="perf-label">Memory:</span>
            <span class="perf-value">{{ memory }} MB</span>
          </div>
          <div class="perf-item">
            <span class="perf-label">Render:</span>
            <span class="perf-value">{{ renderTime }}ms</span>
          </div>
          <div class="perf-item">
            <span class="perf-label">Points:</span>
            <span class="perf-value">{{ rawData.length.toLocaleString() }}</span>
          </div>
        </div>
        
        <!-- Time Range Selector -->
        <TimeRangeSelector @update:range="onRangeChange" />
      </div>
    </header>

    <!-- Main Content -->
    <main class="dashboard-main">
      <!-- Charts Grid - 2x2 Layout -->
      <section class="charts-grid">
        <div class="chart-card">
          <h3>Line Chart</h3>
          <LineChart :data="aggregatedData" />
        </div>
        <div class="chart-card">
          <h3>Bar Chart</h3>
          <BarChart :data="aggregatedData" />
        </div>
        <div class="chart-card">
          <h3>Scatter Plot</h3>
          <ScatterPlot :data="aggregatedData" />
        </div>
        <div class="chart-card">
          <h3>Heatmap</h3>
          <Heatmap :data="aggregatedData" />
        </div>
      </section>

      <!-- Sidebar: Filters & Table -->
      <aside class="dashboard-sidebar">
        <div class="filter-card">
          <h3>Filters</h3>
          <FilterPanel @update:filter="onFilter" />
        </div>
        <div class="table-card">
          <h3>Data Table</h3>
          <DataTable :data="filteredData" />
        </div>
      </aside>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useDataStream } from './composables/useDataStream';
import { usePerformanceMonitor } from './composables/usePerformanceMonitor';
import LineChart from './components/charts/LineChart.vue';
import BarChart from './components/charts/BarChart.vue';
import ScatterPlot from './components/charts/ScatterPlot.vue';
import Heatmap from './components/charts/Heatmap.vue';
import DataTable from './components/DataTable.vue';
import FilterPanel from './components/controls/FilterPanel.vue';
import TimeRangeSelector from './components/controls/TimeRangeSelector.vue';
import type { DataPoint, TimeRange } from './types/dashboard.types';

// ============================================
// Configuration
// ============================================
const DATA_SIZE = 50000; // Change to 50000 or 100000 for stretch goals
const UPDATE_INTERVAL = 100; // milliseconds

// ============================================
// State Management
// ============================================
const timeRange = ref<TimeRange>('1min');
const min = ref<number | null>(null);
const max = ref<number | null>(null);

// ============================================
// Data & Performance Hooks
// ============================================
const rawData = useDataStream(DATA_SIZE, UPDATE_INTERVAL);
const { fps, memory, renderTime } = usePerformanceMonitor();

// ============================================
// Event Handlers
// ============================================
function onRangeChange(range: TimeRange) {
  timeRange.value = range;
  console.log(`📅 Time range changed to: ${range}`);
}

function onFilter(filter: { min: number | null; max: number | null }) {
  min.value = filter.min;
  max.value = filter.max;
  console.log(`🔍 Filter applied - Min: ${min.value}, Max: ${max.value}`);
}

// ============================================
// Computed Properties
// ============================================

/**
 * Filter data based on min/max values
 */
const filteredData = computed<DataPoint[]>(() => {
  let result = rawData.value;

  if (min.value !== null) {
    result = result.filter((row) => row.value >= min.value!);
  }

  if (max.value !== null) {
    result = result.filter((row) => row.value <= max.value!);
  }

  return result;
});

/**
 * Aggregate data based on selected time range
 */
const aggregatedData = computed<DataPoint[]>(() => {
  const data = filteredData.value;
  if (data.length === 0) return [];

  // Determine bucket size in seconds
  const bucketSizeMap: Record<TimeRange, number> = {
    '1min': 60,
    '5min': 300,
    '1hr': 3600,
  };

  const bucketSize = bucketSizeMap[timeRange.value];
  const buckets = new Map<number, number[]>();

  // Group data points into time buckets
  data.forEach((point) => {
    const bucketKey =
      Math.floor(point.timestamp / (bucketSize * 1000)) * bucketSize * 1000;

    if (!buckets.has(bucketKey)) {
      buckets.set(bucketKey, []);
    }

    buckets.get(bucketKey)!.push(point.value);
  });

  // Calculate average for each bucket and return as DataPoint[]
  const result: DataPoint[] = Array.from(buckets.entries()).map(
    ([timestamp, values]) => ({
      timestamp,
      value:
        Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10) /
        10,
      category: data[0]?.category,
    })
  );

  return result;
});

// ============================================
// Watchers for Performance Monitoring
// ============================================
watch(fps, (newFps) => {
  if (newFps < 30) {
    console.warn(`⚠️ Low FPS detected: ${newFps} fps`);
  } else if (newFps >= 60) {
    console.log(`✅ Optimal performance: ${newFps} fps`);
  }
});

watch(
  () => rawData.value.length,
  (length) => {
    console.log(`📊 Total data points: ${length.toLocaleString()}`);
  }
);

watch(
  () => filteredData.value.length,
  (length) => {
    console.log(`🔍 Filtered data points: ${length.toLocaleString()}`);
  }
);

watch(
  () => aggregatedData.value.length,
  (length) => {
    console.log(`📈 Aggregated data points: ${length.toLocaleString()}`);
  }
);

watch(renderTime, (time) => {
  if (time > 16.67) {
    console.warn(`⚠️ Slow render: ${time}ms (target: <16.67ms for 60fps)`);
  }
});
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.dashboard {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background: #0a0e1a;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  overflow: hidden;
}

/* ===== Header ===== */
.dashboard-header {
  background: #1a1f2e;
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #2a2f3e;
  flex-shrink: 0;
}

.dashboard-header h1 {
  font-size: 1.75rem;
  font-weight: 600;
}

.header-controls {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

/* ===== Performance Monitor ===== */
.perf-monitor {
  display: flex;
  gap: 1.5rem;
  background: rgba(0, 0, 0, 0.4);
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-size: 0.85rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.perf-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.perf-label {
  color: #8b92a8;
  font-weight: 500;
  font-size: 0.8rem;
}

.perf-value {
  font-weight: 700;
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.9rem;
  color: #4ade80;
}

/* ===== Main Layout ===== */
.dashboard-main {
  display: flex;
  flex: 1;
  gap: 1.5rem;
  padding: 1.5rem;
  overflow: hidden;
  min-height: 0;
}

/* ===== Charts Grid (2x2) ===== */
.charts-grid {
  flex: 2;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1.5rem;
  overflow-y: auto;
  height: 100%;
}

.chart-card {
  background: #1a1f2e;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #2a2f3e;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  overflow: hidden;
}

.chart-card:hover {
  border-color: #4f8ef7;
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(79, 142, 247, 0.2);
}

.chart-card h3 {
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: #a8b2d1;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex-shrink: 0;
}

/* ===== Sidebar ===== */
.dashboard-sidebar {
  flex: 0 0 380px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: auto;
  height: 100%;
}

.filter-card,
.table-card {
  background: #1a1f2e;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #2a2f3e;
}

.filter-card h3,
.table-card h3 {
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: #a8b2d1;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.table-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
}

/* ===== Scrollbar ===== */
.charts-grid::-webkit-scrollbar,
.dashboard-sidebar::-webkit-scrollbar {
  width: 8px;
}

.charts-grid::-webkit-scrollbar-track,
.dashboard-sidebar::-webkit-scrollbar-track {
  background: #0a0e1a;
}

.charts-grid::-webkit-scrollbar-thumb,
.dashboard-sidebar::-webkit-scrollbar-thumb {
  background: #2a2f3e;
  border-radius: 4px;
}

.charts-grid::-webkit-scrollbar-thumb:hover,
.dashboard-sidebar::-webkit-scrollbar-thumb:hover {
  background: #3a3f4e;
}

/* ===== Responsive Design - TABLET ===== */
@media (max-width: 1200px) {
  .dashboard-main {
    flex-direction: column;
    overflow-y: auto;
    height: auto;
  }

  .charts-grid {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, auto);
    max-height: none;
    overflow-y: visible;
  }

  .dashboard-sidebar {
    flex: none;
    max-height: none;
    overflow-y: visible;
  }

  .chart-card {
    min-height: 300px;
  }
}

/* ===== Responsive Design - MOBILE (CRITICAL FIX) ===== */
@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
    padding: 1rem;
  }

  .dashboard-header h1 {
    font-size: 1.5rem;
  }

  .header-controls {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .perf-monitor {
    font-size: 0.75rem;
    padding: 0.5rem 0.8rem;
    gap: 0.75rem;
    flex-wrap: wrap;
    width: 100%;
  }

  .perf-item {
    flex-direction: row;
    gap: 0.3rem;
  }

  .dashboard-main {
    padding: 1rem;
    gap: 1.5rem;
    height: auto;
    overflow-y: auto;
  }

  /* ===== FIX: Change Grid to Flex Column for Mobile ===== */
  .charts-grid {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    overflow: visible;
    height: auto;
  }

  /* ===== FIX: Ensure All Charts Render ===== */
  .chart-card {
    min-height: 300px;
    max-height: none;
    padding: 1.5rem;
    width: 100%;
  }

  /* ===== Force Canvas to Render ===== */
  .chart-card canvas {
    min-height: 220px !important;
    width: 100% !important;
  }

  .dashboard-sidebar {
    width: 100%;
    height: auto;
    overflow: visible;
    gap: 1.5rem;
  }

  .filter-card,
  .table-card {
    padding: 1.5rem;
  }

  /* ===== FIX: DATA TABLE VISIBILITY ===== */
  .table-card {
    min-height: 400px !important;
    max-height: 600px;
    overflow: auto;
    display: flex !important;
    flex-direction: column;
  }
}

/* ===== Responsive Design - SMALL MOBILE ===== */
@media (max-width: 480px) {
  .dashboard-header h1 {
    font-size: 1.25rem;
  }

  .perf-monitor {
    font-size: 0.7rem;
    padding: 0.4rem 0.6rem;
  }

  .chart-card {
    min-height: 280px;
    padding: 1rem;
  }

  .chart-card h3 {
    font-size: 0.9rem;
  }

  .table-card {
    min-height: 350px !important;
  }
}
</style>

// Core Data Structures
export interface DataPoint {
  timestamp: number;
  value: number;
  category?: string;
  metadata?: Record<string, any>;
}

// Chart Configuration
export interface ChartConfig {
  type: 'line' | 'bar' | 'scatter' | 'heatmap';
  dataKey: string;
  color: string;
  visible: boolean;
  title?: string;
}

// Performance Metrics
export interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  renderTime: number;
  dataPoints: number;
}

// Filter Configuration
export interface FilterConfig {
  min: number | null;
  max: number | null;
  categories?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
}

// Time Range Types
export type TimeRange = '1min' | '5min' | '1hr';

// Aggregated Data Point
export interface AggregatedData {
  timestamp: number;
  value: number;
  count: number;
  min: number;
  max: number;
  average: number;
}

// Chart Interaction Events
export interface ChartInteraction {
  type: 'zoom' | 'pan' | 'select' | 'hover';
  data?: any;
  timestamp: number;
}

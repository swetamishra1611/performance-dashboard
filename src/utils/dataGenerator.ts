export interface GeneratedDataPoint {
  timestamp: number;
  value: number;
  category?: string;
}

/**
 * Generate realistic time-series data
 */
export function generateTimeSeriesData(
  size: number,
  startTime: number = Date.now(),
  interval: number = 100
): GeneratedDataPoint[] {
  const data: GeneratedDataPoint[] = [];
  let value = 50;
  
  for (let i = 0; i < size; i++) {
    // Random walk with trend
    value += (Math.random() - 0.48) * 10;
    value = Math.max(0, Math.min(100, value));
    
    data.push({
      timestamp: startTime + i * interval,
      value: Math.round(value * 10) / 10,
      category: i % 3 === 0 ? 'A' : i % 3 === 1 ? 'B' : 'C'
    });
  }
  
  return data;
}

/**
 * Generate data with seasonal patterns
 */
export function generateSeasonalData(
  size: number,
  startTime: number = Date.now(),
  interval: number = 100
): GeneratedDataPoint[] {
  const data: GeneratedDataPoint[] = [];
  
  for (let i = 0; i < size; i++) {
    // Sine wave with noise for seasonal pattern
    const seasonal = 50 + 30 * Math.sin(i / 100);
    const noise = (Math.random() - 0.5) * 20;
    const value = Math.max(0, Math.min(100, seasonal + noise));
    
    data.push({
      timestamp: startTime + i * interval,
      value: Math.round(value * 10) / 10
    });
  }
  
  return data;
}

/**
 * Generate spike data (for testing)
 */
export function generateSpikeData(
  size: number,
  spikeInterval: number = 100
): GeneratedDataPoint[] {
  const data: GeneratedDataPoint[] = [];
  let value = 50;
  
  for (let i = 0; i < size; i++) {
    // Add occasional spikes
    if (i % spikeInterval === 0) {
      value = 90 + Math.random() * 10;
    } else {
      value = 40 + Math.random() * 20;
    }
    
    data.push({
      timestamp: Date.now() + i * 100,
      value: Math.round(value * 10) / 10
    });
  }
  
  return data;
}

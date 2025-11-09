/**
 * Measure function execution time
 */
export function measurePerformance<T>(
  fn: () => T,
  label: string = 'Operation'
): T {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  console.log(`${label} took ${(end - start).toFixed(2)}ms`);
  return result;
}

/**
 * Throttle function execution
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return function(...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  };
}

/**
 * Debounce function execution
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return function(...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Calculate FPS from frame timestamps
 */
export function calculateFPS(frameTimes: number[]): number {
  if (frameTimes.length < 2) return 0;
  
  const deltas = [];
  for (let i = 1; i < frameTimes.length; i++) {
    deltas.push(frameTimes[i] - frameTimes[i - 1]);
  }
  
  const avgDelta = deltas.reduce((a, b) => a + b, 0) / deltas.length;
  return Math.round(1000 / avgDelta);
}

/**
 * Get memory usage (if available)
 */
export function getMemoryUsage(): number {
  if ((performance as any).memory) {
    return Math.round((performance as any).memory.usedJSHeapSize / 1048576);
  }
  return 0;
}

/**
 * Sample data for performance (take every nth item)
 */
export function sampleData<T>(data: T[], maxPoints: number): T[] {
  if (data.length <= maxPoints) return data;
  
  const step = Math.ceil(data.length / maxPoints);
  return data.filter((_, i) => i % step === 0);
}

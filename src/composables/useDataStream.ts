import { shallowRef, onMounted, onUnmounted } from 'vue'; // ✅ Change ref to shallowRef
import type { DataPoint } from '../types/dashboard.types';

export function useDataStream(size = 10000, interval = 100) {
  const data = shallowRef<DataPoint[]>([]); // ✅ Use shallowRef for large arrays
  let timer: NodeJS.Timeout | undefined;

  const categories = ['A', 'B', 'C'];

  function generateInitialData(size: number): DataPoint[] {
    const now = Date.now();
    let val = 50;
    const result: DataPoint[] = [];
    
    for (let i = 0; i < size; i++) {
      val += (Math.random() - 0.5) * 10;
      val = Math.max(0, Math.min(100, val));
      
      result.push({
        timestamp: now + i * interval,
        value: Math.round(val * 10) / 10,
        category: categories[i % categories.length],
        metadata: {
          id: i,
          source: 'real-time',
          quality: Math.random() > 0.5 ? 'high' : 'medium'
        }
      });
    }
    return result;
  }

  function updateData() {
    if (data.value.length === 0) return;
    
    const last = data.value[data.value.length - 1];
    let newValue = last.value + (Math.random() - 0.5) * 10;
    newValue = Math.max(0, Math.min(100, newValue));
    
    const newPoint: DataPoint = {
      timestamp: last.timestamp + interval,
      value: Math.round(newValue * 10) / 10,
      category: categories[Math.floor(Math.random() * categories.length)],
      metadata: {
        id: data.value.length,
        source: 'real-time',
        quality: Math.random() > 0.5 ? 'high' : 'medium'
      }
    };
    
    // ✅ Use shallowRef-friendly update
    data.value = [...data.value.slice(-(size - 1)), newPoint];
  }

  onMounted(() => {
    data.value = generateInitialData(size);
    timer = setInterval(updateData, interval);
  });

  onUnmounted(() => {
    if (timer) clearInterval(timer);
  });

  return data;
}

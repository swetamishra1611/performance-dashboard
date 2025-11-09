import { ref, onMounted, onUnmounted } from 'vue';

export function useChartRenderer(canvasRef: Ref<HTMLCanvasElement | null>) {
  const isRendering = ref(false);
  let animationId: number;

  function scheduleRender(renderFn: () => void) {
    if (animationId) cancelAnimationFrame(animationId);
    animationId = requestAnimationFrame(() => {
      isRendering.value = true;
      renderFn();
      isRendering.value = false;
    });
  }

  function clearCanvas() {
    const canvas = canvasRef.value;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  onUnmounted(() => {
    if (animationId) cancelAnimationFrame(animationId);
  });

  return {
    scheduleRender,
    clearCanvas,
    isRendering
  };
}

/**
 * Setup canvas with device pixel ratio for crisp rendering
 */
export function setupCanvas(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  const ctx = canvas.getContext('2d', { alpha: false })!;
  const dpr = window.devicePixelRatio || 1;
  
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  
  return ctx;
}

/**
 * Clear canvas
 */
export function clearCanvas(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.clearRect(0, 0, width, height);
}

/**
 * Draw grid lines
 */
export function drawGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  gridSize: number = 50,
  color: string = '#2a2f3e'
) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  
  // Vertical lines
  for (let x = 0; x <= width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  
  // Horizontal lines
  for (let y = 0; y <= height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}

/**
 * Draw axes
 */
export function drawAxes(
  ctx: CanvasRenderingContext2D,
  padding: number,
  width: number,
  height: number,
  color: string = '#2a2f3e'
) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  
  // X axis
  ctx.beginPath();
  ctx.moveTo(padding, height - padding);
  ctx.lineTo(width - padding, height - padding);
  ctx.stroke();
  
  // Y axis
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, height - padding);
  ctx.stroke();
}

/**
 * Draw text with background
 */
export function drawLabelWithBackground(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  bgColor: string = '#1a1f2e',
  textColor: string = '#ffffff'
) {
  ctx.font = '12px sans-serif';
  const metrics = ctx.measureText(text);
  const padding = 4;
  
  // Background
  ctx.fillStyle = bgColor;
  ctx.fillRect(
    x - padding,
    y - 12 - padding,
    metrics.width + padding * 2,
    16 + padding * 2
  );
  
  // Text
  ctx.fillStyle = textColor;
  ctx.fillText(text, x, y);
}

/**
 * Get color based on value (heatmap)
 */
export function getHeatmapColor(value: number, min: number, max: number): string {
  const normalized = (value - min) / (max - min || 1);
  const r = Math.round(255 * normalized);
  const b = Math.round(255 * (1 - normalized));
  return `rgb(${r}, 60, ${b})`;
}

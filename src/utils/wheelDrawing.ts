import { WHEEL_SEGMENTS } from '../config/constants';

const GOLD_GRADIENT = {
  start: '#FFD700',
  middle: '#FDB931',
  end: '#FF8C00'
};

const SEGMENT_COLORS = [
  { main: '#FF6B6B', highlight: '#FF8A8A', shadow: '#CC5757' }, // Red
  { main: '#4ECDC4', highlight: '#6DDBD3', shadow: '#3FA39B' }, // Teal
  { main: '#45B7D1', highlight: '#64C6DC', shadow: '#3792A7' }, // Blue
  { main: '#96CEB4', highlight: '#B5DBC9', shadow: '#78A590' }, // Mint
  { main: '#FFEEAD', highlight: '#FFF2CC', shadow: '#CCB98A' }, // Yellow
  { main: '#D4A5A5', highlight: '#E3C4C4', shadow: '#A98484' }, // Pink
  { main: '#9DE0AD', highlight: '#BCF0C8', shadow: '#7EB38A' }, // Green
  { main: '#FF9999', highlight: '#FFB8B8', shadow: '#CC7A7A' }  // Coral
];

export function drawWheel(canvas: HTMLCanvasElement | null, rotation: number): void {
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(centerX, centerY) - 20;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw outer glow
  const outerGlow = ctx.createRadialGradient(centerX, centerY, radius - 5, centerX, centerY, radius + 10);
  outerGlow.addColorStop(0, 'rgba(255, 215, 0, 0.3)');
  outerGlow.addColorStop(1, 'rgba(255, 215, 0, 0)');
  ctx.fillStyle = outerGlow;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw wheel background
  ctx.save();
  const bgGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
  bgGradient.addColorStop(0, '#2C3E50');
  bgGradient.addColorStop(1, '#1A1A1A');
  
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.fillStyle = bgGradient;
  ctx.fill();
  ctx.restore();

  // Draw segments with precise angles
  const segmentAngle = (Math.PI * 2) / WHEEL_SEGMENTS.length;
  WHEEL_SEGMENTS.forEach((segment, i) => {
    ctx.save();
    
    // Calculate precise angles for this segment
    const startAngle = segmentAngle * i + rotation;
    const endAngle = startAngle + segmentAngle;
    
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    
    const colors = SEGMENT_COLORS[i % SEGMENT_COLORS.length];
    const segmentGradient = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, radius
    );
    
    segmentGradient.addColorStop(0, colors.highlight);
    segmentGradient.addColorStop(0.5, colors.main);
    segmentGradient.addColorStop(1, colors.shadow);
    
    ctx.fillStyle = segmentGradient;
    ctx.fill();
    
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw text
    ctx.translate(centerX, centerY);
    ctx.rotate(startAngle + segmentAngle / 2);
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.font = 'bold 24px Arial';
    ctx.fillText(segment.text, radius - 35, 2);
    
    const textGradient = ctx.createLinearGradient(
      radius - 80, 0,
      radius - 20, 0
    );
    textGradient.addColorStop(0, GOLD_GRADIENT.start);
    textGradient.addColorStop(0.5, GOLD_GRADIENT.middle);
    textGradient.addColorStop(1, GOLD_GRADIENT.end);
    
    ctx.fillStyle = textGradient;
    ctx.fillText(segment.text, radius - 35, 0);
    
    ctx.restore();
  });

  // Draw decorative rings with smaller center
  drawDecorativeRings(ctx, centerX, centerY, radius);
}

function drawDecorativeRings(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number
): void {
  // Outer ring
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  const outerRingGradient = ctx.createLinearGradient(
    centerX - radius,
    centerY - radius,
    centerX + radius,
    centerY + radius
  );
  outerRingGradient.addColorStop(0, GOLD_GRADIENT.start);
  outerRingGradient.addColorStop(0.5, GOLD_GRADIENT.middle);
  outerRingGradient.addColorStop(1, GOLD_GRADIENT.end);
  ctx.strokeStyle = outerRingGradient;
  ctx.lineWidth = 6;
  ctx.stroke();

  // Inner decorative circle (reduced size)
  ctx.beginPath();
  ctx.arc(centerX, centerY, 25, 0, Math.PI * 2);
  const innerGradient = ctx.createRadialGradient(
    centerX, centerY, 0,
    centerX, centerY, 25
  );
  innerGradient.addColorStop(0, GOLD_GRADIENT.start);
  innerGradient.addColorStop(0.7, GOLD_GRADIENT.middle);
  innerGradient.addColorStop(1, GOLD_GRADIENT.end);
  ctx.fillStyle = innerGradient;
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Center dot
  ctx.beginPath();
  ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
}
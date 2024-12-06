import { WHEEL_SEGMENTS } from '../config/constants';

export interface SpinResult {
  segmentIndex: number;
  rotation: number;
}

export function calculateTargetRotation(currentRotation: number, targetSegment: number): SpinResult {
  const segmentAngle = (Math.PI / 4 ) / WHEEL_SEGMENTS.length;
  const baseRotations = 4; // Number of full rotations
  
  // Calculate the exact angle needed to land on the target segment
  const targetAngle = (WHEEL_SEGMENTS.length - 1 - targetSegment) * segmentAngle;
  
  // Add full rotations and align with the pointer at top (subtract π/2)
  const targetRotation = currentRotation + 
    (Math.PI * 2 * baseRotations) + 
    targetAngle - 
    (currentRotation % (Math.PI * 2)) + 
    Math.PI / 2;

  return {
    segmentIndex: targetSegment,
    rotation: targetRotation
  };
}

export function getEasing(progress: number): number {
  // Custom easing function for more realistic wheel spinning
  return 1 - Math.pow(1 - progress, 3);
}

export function calculateCurrentSegment(rotation: number): number {
  const segmentAngle = (Math.PI * 2) / WHEEL_SEGMENTS.length;
  const normalizedRotation = (rotation % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
  const segmentIndex = Math.floor(normalizedRotation / segmentAngle);
  return (WHEEL_SEGMENTS.length - 1 - segmentIndex) % WHEEL_SEGMENTS.length;
}

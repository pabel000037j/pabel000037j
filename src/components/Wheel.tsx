import React, { useEffect, useRef, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { WHEEL_SEGMENTS } from '../config/constants';
import { WheelPointer } from './WheelPointer';
import { WinningEffect } from './WinningEffect';
import { drawWheel } from '../utils/wheelDrawing';
import { calculateTargetRotation, getEasing, calculateCurrentSegment } from '../utils/wheelAnimation';
import { motion, AnimatePresence } from 'framer-motion';

export const Wheel: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { spinning, setSpinning, selectedAmount, setCoins, addToHistory, saveUserData } = useGameStore();
  const rotationRef = useRef(0);
  const animationRef = useRef<number>();
  const [winEffect, setWinEffect] = useState({
    show: false,
    amount: 0,
    multiplier: 0
  });

  const spin = () => {
    if (spinning) return;
    setSpinning(true);

    // Randomly select target segment
    const targetSegment = Math.floor(Math.random() * WHEEL_SEGMENTS.length);
    const { rotation: targetRotation } = calculateTargetRotation(rotationRef.current, targetSegment);

    const startTime = performance.now();
    const duration = 3000;

    const animate = async (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const eased = getEasing(progress);
      const newRotation = rotationRef.current + (targetRotation - rotationRef.current) * eased;
      rotationRef.current = newRotation;
      
      drawWheel(canvasRef.current, newRotation);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setSpinning(false);
        
        // Get the final segment based on actual rotation
        const finalSegmentIndex = calculateCurrentSegment(newRotation);
        const multiplier = WHEEL_SEGMENTS[finalSegmentIndex].multiplier;
        const winnings = selectedAmount * multiplier;
        
        setCoins((prev) => prev - selectedAmount + winnings);
        addToHistory(selectedAmount, multiplier, winnings);
        await saveUserData();
        
        setWinEffect({
          show: true,
          amount: winnings,
          multiplier
        });
        
        setTimeout(() => {
          setWinEffect(prev => ({ ...prev, show: false }));
        }, 1500);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 300;
    canvas.height = 300;
    drawWheel(canvas, rotationRef.current);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="relative">
      <WheelPointer />
      <canvas
        ref={canvasRef}
        className="max-w-full h-auto cursor-pointer"
        onClick={spin}
      />
      <WinningEffect
        show={winEffect.show}
        amount={winEffect.amount}
        multiplier={winEffect.multiplier}
      />
    </div>
  );
};
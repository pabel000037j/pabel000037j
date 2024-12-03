import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WinningEffectProps {
  show: boolean;
  amount: number;
  multiplier: number;
}

export const WinningEffect: React.FC<WinningEffectProps> = ({ show, amount, multiplier }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3 }} // Faster initial animation
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          {/* Main winning display */}
          <motion.div
            initial={{ y: 0, scale: 0.8 }}
            animate={{ 
              y: -50,
              scale: 1,
              transition: {
                duration: 0.5,
                ease: "easeOut"
              }
            }}
            className="relative bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 
                     text-white font-bold rounded-lg px-8 py-4 shadow-lg
                     flex flex-col items-center gap-2"
            style={{
              boxShadow: '0 0 30px rgba(255, 215, 0, 0.5)',
            }}
          >
            {/* Glowing border effect */}
            <motion.div
              className="absolute inset-0 rounded-lg"
              animate={{
                boxShadow: ['0 0 20px rgba(255,215,0,0.5)', '0 0 40px rgba(255,215,0,0.8)', '0 0 20px rgba(255,215,0,0.5)'],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Amount display */}
            <motion.span
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-5xl relative"
            >
              +{amount}
              <motion.span
                className="absolute top-0 left-0 w-full h-full"
                animate={{
                  opacity: [0, 0.5, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 0.5,
                  repeat: 1,
                }}
              >
                +{amount}
              </motion.span>
            </motion.span>
            
            {/* Multiplier display */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-yellow-200"
            >
              {multiplier}x
            </motion.span>
          </motion.div>

          {/* Particle effects */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute inset-0"
          >
            {Array.from({ length: 16 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: [0, Math.cos(i * (Math.PI * 2 / 16)) * 150],
                  y: [0, Math.sin(i * (Math.PI * 2 / 16)) * 150],
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  times: [0, 0.5, 1]
                }}
                className="absolute left-1/2 top-1/2 w-3 h-3"
                style={{
                  background: 'radial-gradient(circle at center, #FFD700, transparent)',
                  borderRadius: '50%',
                  boxShadow: '0 0 10px rgba(255, 215, 0, 0.8)',
                }}
              />
            ))}
          </motion.div>

          {/* Circular shockwave effect */}
          <motion.div
            initial={{ scale: 0.8, opacity: 1 }}
            animate={{
              scale: 2,
              opacity: 0,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className="absolute w-40 h-40 rounded-full"
            style={{
              background: 'radial-gradient(circle at center, rgba(255,215,0,0.3) 0%, transparent 70%)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
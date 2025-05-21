// AnimatedMemoryVisualizer: Visualizes memory blocks and allocations with animation.
// Uses Framer Motion for smooth transitions and color-coding for allocations.

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function AnimatedMemoryVisualizer({ blocks, allocations }) {
  const containerRef = useRef(null);

  const getBlockColor = (block, allocation) => {
    if (!block.isFree) {
      // Generate a consistent color based on the process ID
      const processId = allocations.find(a => a.blockIdx === blocks.indexOf(block))?.id;
      if (processId) {
        const hue = (parseInt(processId.slice(1)) * 30) % 360;
        return `hsl(${hue}, 70%, 60%)`;
      }
      return '#4CAF50'; // Default allocated color
    }
    return '#E0E0E0'; // Free block color
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
       
        <div 
          ref={containerRef}
          className="d-flex flex-wrap gap-2 p-3 border rounded"
          style={{ minHeight: '100px' }}
        >
          <AnimatePresence>
            {blocks.map((block, index) => {
              const allocation = allocations.find(a => a.blockIdx === index);
              return (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1,
                    width: `${(block.size / Math.max(...blocks.map(b => b.size))) * 100}%`,
                    backgroundColor: getBlockColor(block, allocation)
                  }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="memory-block p-2 rounded text-white"
                  style={{
                    minWidth: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}
                >
                  <div className="text-center">
                    <div className="fw-bold">{block.size} KB</div>
                    {allocation && (
                      <div className="small">
                        {allocation.id}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default AnimatedMemoryVisualizer;
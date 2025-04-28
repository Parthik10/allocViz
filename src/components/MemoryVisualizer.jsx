// Main memory map (grid or bar visualization)

import React from 'react';
import MemoryBlock from './MemoryBlock';

function MemoryVisualizer({ memoryBlocks }) {
    return (
        <div className="d-flex flex-wrap border p-3">
            {memoryBlocks.map((block, index) => (
                <MemoryBlock
                    key={index}
                    size={block.size}
                    isFree={block.isFree}
                    allocatedSize={block.allocatedSize}
                />
            ))}
        </div>
    );
}

export default MemoryVisualizer;

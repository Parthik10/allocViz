// MemoryContext: React context for global memory state and selected strategy.

import React, { createContext, useState } from 'react';

// Create Context
export const MemoryContext = createContext();

// Provider Component
export function MemoryProvider({ children }) {
    const [memoryBlocks, setMemoryBlocks] = useState([
        { size: 100, isFree: true },
        { size: 200, isFree: true },
        { size: 300, isFree: true },
        { size: 150, isFree: true },
        { size: 250, isFree: true },
        { size: 400, isFree: true },
        { size: 350, isFree: true },
        { size: 500, isFree: true }
    ]);

    const [selectedStrategy, setSelectedStrategy] = useState("First Fit");

    return (
        <MemoryContext.Provider value={{ memoryBlocks, setMemoryBlocks, selectedStrategy, setSelectedStrategy }}>
            {children}
        </MemoryContext.Provider>
    );
}

// (Optional) Global state management (selected strategy, memory state)
// MemoryContext.js

import React, { createContext, useState } from 'react';

// Create Context
export const MemoryContext = createContext();

// Provider Component
export function MemoryProvider({ children }) {
    const [memoryBlocks, setMemoryBlocks] = useState([
        { size: 100, isFree: true },
        { size: 200, isFree: true },
        { size: 300, isFree: true }
    ]);

    const [selectedStrategy, setSelectedStrategy] = useState("First Fit");

    return (
        <MemoryContext.Provider value={{ memoryBlocks, setMemoryBlocks, selectedStrategy, setSelectedStrategy }}>
            {children}
        </MemoryContext.Provider>
    );
}

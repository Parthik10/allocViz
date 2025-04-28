// Utility functions (calculate fragmentation, etc.)

// helperFunctions.js

// Calculate total fragmentation percentage
export function calculateFragmentation(blocks) {
    const totalSize = blocks.reduce((acc, block) => acc + block.size, 0);
    const wastedSize = blocks.reduce((acc, block) => acc + (block.isFree ? block.size : 0), 0);
    return ((wastedSize / totalSize) * 100).toFixed(2);
}

// Calculate memory usage percentage
export function calculateMemoryUsage(blocks) {
    const totalSize = blocks.reduce((acc, block) => acc + block.size, 0);
    const usedSize = blocks.reduce((acc, block) => acc + (block.isFree ? 0 : block.allocatedSize), 0);
    return ((usedSize / totalSize) * 100).toFixed(2);
}

// Calculate wasted space in KB
export function calculateWastedSpace(blocks) {
    return blocks.reduce((acc, block) => acc + (block.isFree ? block.size : 0), 0);
}

// Success rate (simplified for now, can be expanded later)
export function calculateAllocationSuccess(blocks) {
    const totalBlocks = blocks.length;
    const allocatedBlocks = blocks.filter(block => !block.isFree).length;
    return ((allocatedBlocks / totalBlocks) * 100).toFixed(2);
}


// Internal fragmentation per allocation
export function calculateInternalFragmentation(blocks, allocations) {
    return allocations.map(a => {
      if (a.blockIdx === null) return { id: a.id, frag: null };
      const block = blocks[a.blockIdx];
      return { id: a.id, frag: block.size - a.size };
    });
  }
  
  // External fragmentation: sum sizes of free blocks that are too small for any pending job
  export function calculateExternalFragmentation(blocks, allocations) {
    const unallocated = allocations.filter(a => a.blockIdx === null);
    if (!unallocated.length) return 0;
    const minReq = Math.min(...unallocated.map(a => a.size));
    return blocks
      .filter(b => b.isFree && b.size < minReq)
      .reduce((sum, b) => sum + b.size, 0);
  }
  
  export function calculateTotalWastage(blocks, allocations) {
    const internal = calculateInternalFragmentation(blocks, allocations)
      .reduce((sum, x) => sum + (x.frag || 0), 0);
    const external = calculateExternalFragmentation(blocks, allocations);
    return internal + external;
  }
  
  export function countUnallocated(allocations) {
    return allocations.filter(a => a.blockIdx === null).length;
  }
  
  
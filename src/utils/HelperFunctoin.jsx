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
  // Group allocations by job ID to handle paging (multiple blocks per job)
  const jobAllocations = {};
  
  allocations.forEach(a => {
    if (a.blockIdx === null) return;
    
    if (!jobAllocations[a.id]) {
      jobAllocations[a.id] = {
        job: a,
        blocks: [],
        totalAllocated: 0
      };
    }
    
    const block = blocks[a.blockIdx];
    jobAllocations[a.id].blocks.push(block);
    jobAllocations[a.id].totalAllocated += block.allocatedSize;
  });
  
  return allocations.map(a => {
    if (a.blockIdx === null) return { id: a.id, frag: null };
    
    // For paging (multiple blocks)
    const jobAlloc = jobAllocations[a.id];
    if (jobAlloc && jobAlloc.blocks.length > 1) {
      // With paging, internal fragmentation is the difference between
      // total allocated size and the job size
      return { 
        id: a.id, 
        frag: Math.max(0, jobAlloc.totalAllocated - a.size) 
      };
    }
    
    // For single block allocation
    const block = blocks[a.blockIdx];
    return { id: a.id, frag: Math.max(0, block.size - a.size) };
  });
}

// External fragmentation: sum sizes of free blocks that are too small for any pending job
export function calculateExternalFragmentation(blocks, allocations) {
  const unallocated = allocations.filter(a => a.blockIdx === null);
  if (!unallocated.length) return 0;
  
  const minReq = Math.min(...unallocated.map(a => a.size));
  
  // Calculate total size of free blocks that are too small to be useful
  const externalFrag = blocks
    .filter(b => b.isFree && b.size < minReq)
    .reduce((sum, b) => sum + b.size, 0);
    
  return externalFrag;
}

export function calculateTotalWastage(blocks, allocations) {
  // Calculate internal fragmentation
  const internal = calculateInternalFragmentation(blocks, allocations)
    .reduce((sum, x) => sum + (x.frag || 0), 0);
    
  // Calculate external fragmentation
  const external = calculateExternalFragmentation(blocks, allocations);
  
  return internal + external;
}

export function countUnallocated(allocations) {
  return allocations.filter(a => a.blockIdx === null).length;
}
  
  
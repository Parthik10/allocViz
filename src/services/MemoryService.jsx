// Logic functions (First Fit, Best Fit, Worst Fit, Paging)

// memoryService.js

// First Fit Algorithm
export function firstFit(blocks, requestSize) {
    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i].isFree && blocks[i].size >= requestSize) {
            blocks[i].isFree = false;
            blocks[i].allocatedSize = requestSize;
            return blocks;
        }
    }
    return blocks;
}

// Best Fit Algorithm
export function bestFit(blocks, requestSize) {
    let bestIdx = -1;
    let minSize = Infinity;
    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i].isFree && blocks[i].size >= requestSize && blocks[i].size < minSize) {
            bestIdx = i;
            minSize = blocks[i].size;
        }
    }
    if (bestIdx !== -1) {
        blocks[bestIdx].isFree = false;
        blocks[bestIdx].allocatedSize = requestSize;
    }
    return blocks;
}

// Worst Fit Algorithm
export function worstFit(blocks, requestSize) {
    let worstIdx = -1;
    let maxSize = -1;
    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i].isFree && blocks[i].size >= requestSize && blocks[i].size > maxSize) {
            worstIdx = i;
            maxSize = blocks[i].size;
        }
    }
    if (worstIdx !== -1) {
        blocks[worstIdx].isFree = false;
        blocks[worstIdx].allocatedSize = requestSize;
    }
    return blocks;
}

// Paging Algorithm - Fixed implementation
export function paging(blocks, requestSize, pageSize = 100) {
    // Calculate pages needed for this job
    const pagesNeeded = Math.ceil(requestSize / pageSize);
    let freeBlocks = blocks.filter(b => b.isFree);
    
    // If we don't have enough free blocks, return without allocation
    if (freeBlocks.length < pagesNeeded) {
        return blocks;
    }
    
    // Allocate the job across multiple blocks
    let allocated = 0;
    for (let i = 0; i < blocks.length && allocated < pagesNeeded; i++) {
        if (blocks[i].isFree) {
            blocks[i].isFree = false;
            
            // For the last page, we might not need the full page size
            if (allocated === pagesNeeded - 1) {
                const remainingSize = requestSize - (allocated * pageSize);
                blocks[i].allocatedSize = remainingSize > 0 ? remainingSize : pageSize;
            } else {
                blocks[i].allocatedSize = pageSize;
            }
            
            allocated++;
        }
    }
    
    return blocks;
}

export function allocateJobs(initialBlocks, jobs, strategy, pageSize = 100) {
  // Deep clone blocks
  let blocks = initialBlocks.map(b => ({ ...b, allocatedSize: null }));
  const allocations = jobs.map(job => ({ id: job.id, size: job.size, blockIdx: null }));

  jobs.forEach((job, jIdx) => {
    // Clone blocks before allocation to compare state
    const before = blocks.map(b => ({ ...b }));

    let updated;
    switch (strategy) {
      case 'First Fit':
        updated = firstFit(blocks, job.size);
        break;
      case 'Best Fit':
        updated = bestFit(blocks, job.size);
        break;
      case 'Worst Fit':
        updated = worstFit(blocks, job.size);
        break;
      case 'Paging':
        updated = paging(blocks, job.size, pageSize);
        break;
      default:
        updated = blocks;
    }

    // Find which block(s) were just allocated
    if (strategy === 'Paging') {
      // For paging, mark all newly allocated blocks for this job
      let allocatedIndices = [];
      for (let i = 0; i < updated.length; i++) {
        if (before[i].isFree && !updated[i].isFree) {
          allocatedIndices.push(i);
        }
      }
      if (allocatedIndices.length > 0) {
        allocations[jIdx].blockIdx = allocatedIndices[0]; // Store the first block index
      }
    } else {
      // For other strategies, find the single newly allocated block
      const idx = updated.findIndex((blk, i) => before[i].isFree && !blk.isFree);
      if (idx !== -1) {
        allocations[jIdx].blockIdx = idx;
      }
    }
    // blocks is already updated in-place
  });

  return { blocks, allocations };
}

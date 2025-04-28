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

// Paging Algorithm (simple simulation)
export function paging(blocks, requestSize, pageSize = 100) {
    let pagesNeeded = Math.ceil(requestSize / pageSize);
    let allocated = 0;

    for (let i = 0; i < blocks.length && allocated < pagesNeeded; i++) {
        if (blocks[i].isFree) {
            blocks[i].isFree = false;
            blocks[i].allocatedSize = pageSize;
            allocated++;
        }
    }
    return blocks;
}

export function allocateJobs(initialBlocks, jobs, strategy, pageSize = 100) {
  // Deep clone blocks
  const blocks = initialBlocks.map(b => ({ ...b, allocatedSize: null }));
  const allocations = jobs.map(job => ({ id: job.id, size: job.size, blockIdx: null }));

  jobs.forEach((job, jIdx) => {
    const requestSize = job.size;
    let updated;
    switch (strategy) {
      case 'First Fit':
        updated = firstFit(blocks, requestSize);
        break;
      case 'Best Fit':
        updated = bestFit(blocks, requestSize);
        break;
      case 'Worst Fit':
        updated = worstFit(blocks, requestSize);
        break;
      case 'Paging':
        updated = paging(blocks, requestSize, pageSize);
        break;
      default:
        updated = blocks;
    }
    // Find which block was just allocated
    const idx = updated.findIndex(
      (blk, i) => !blk.isFree && blk.allocatedSize === requestSize && allocations[jIdx].blockIdx === null
    );
    if (idx !== -1) allocations[jIdx].blockIdx = idx;
  });
  return { blocks, allocations };
}

// MemoryService: Implements memory allocation algorithms and job allocation logic.

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

export function allocateJobs(blocks, jobs, strategy) {
  const allocations = [];
  let currentTime = 0;

  // Sort jobs based on strategy
  const sortedJobs = [...jobs];
  switch (strategy) {
    case 'First Fit':
      // Already sorted by arrival time
      break;
    case 'Best Fit':
      sortedJobs.sort((a, b) => a.size - b.size);
      break;
    case 'Worst Fit':
      sortedJobs.sort((a, b) => b.size - a.size);
      break;
    default:
      break;
  }

  // Allocate each job
  sortedJobs.forEach((job, index) => {
    const allocation = {
      id: job.id,
      size: job.size,
      startTime: currentTime,
      burstTime: Math.floor(Math.random() * 1000) + 500, // Random burst time between 500-1500ms
      blockIdx: null,
      waitingTime: 0,
      turnaroundTime: 0,
      duration: 0,
      endTime: 0
    };

    // Calculate waiting time based on previous allocation
    if (index > 0) {
      const prevAllocation = allocations[index - 1];
      allocation.waitingTime = Math.max(0, prevAllocation.endTime - allocation.startTime);
    }

    // Find suitable block based on strategy
    let blockIndex = -1;
    switch (strategy) {
      case 'First Fit':
        blockIndex = blocks.findIndex(block => block.isFree && block.size >= job.size);
        break;
      case 'Best Fit':
        blockIndex = blocks
          .map((block, idx) => ({ ...block, idx }))
          .filter(block => block.isFree && block.size >= job.size)
          .sort((a, b) => a.size - b.size)[0]?.idx ?? -1;
        break;
      case 'Worst Fit':
        blockIndex = blocks
          .map((block, idx) => ({ ...block, idx }))
          .filter(block => block.isFree && block.size >= job.size)
          .sort((a, b) => b.size - a.size)[0]?.idx ?? -1;
        break;
      case 'Paging':
        const pageSize = 100;
        const pagesNeeded = Math.ceil(job.size / pageSize);
        let freeBlocks = blocks.filter(b => b.isFree);
        if (freeBlocks.length >= pagesNeeded) {
          blockIndex = blocks.findIndex(block => block.isFree);
        }
        break;
      default:
        blockIndex = -1;
    }

    if (blockIndex !== -1) {
      // Allocate to block
      blocks[blockIndex].isFree = false;
      blocks[blockIndex].allocatedSize = job.size;
      allocation.blockIdx = blockIndex;

      // Calculate duration and end time for allocated process
      allocation.duration = allocation.burstTime;
      allocation.endTime = allocation.startTime + allocation.waitingTime + allocation.duration;
      currentTime = allocation.endTime;

      // Calculate turnaround time
      allocation.turnaroundTime = allocation.waitingTime + allocation.burstTime;
    } else {
      // For unallocated processes
      allocation.duration = 0;
      allocation.endTime = allocation.startTime + allocation.waitingTime;
      currentTime = allocation.endTime;
      allocation.turnaroundTime = allocation.waitingTime;
    }

    allocations.push(allocation);
  });

  return allocations;
}

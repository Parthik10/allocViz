import React from 'react';
import { calculateInternalFragmentation } from '../utils/HelperFunctoin';

function AllocationTable({ blocks, allocations }) {
  const internalFrags = calculateInternalFragmentation(blocks, allocations);
  
  // Group allocations by job ID to handle paging (multiple blocks per job)
  const jobAllocations = {};
  allocations.forEach(a => {
    if (!jobAllocations[a.id]) {
      jobAllocations[a.id] = {
        job: a,
        blocks: [],
        totalAllocated: 0
      };
    }
    
    if (a.blockIdx !== null) {
      const block = blocks[a.blockIdx];
      jobAllocations[a.id].blocks.push(block);
      jobAllocations[a.id].totalAllocated += block.allocatedSize;
    }
  });

  return (
    <div className="mb-4">
      <h5>Memory Allocation Results</h5>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Job Size (KB)</th>
            <th>Allocated Block(s)</th>
            <th>Status</th>
            <th>Internal Fragmentation</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(jobAllocations).map((ja) => {
            const fragObj = internalFrags.find(f => f.id === ja.job.id);
            const isMultiBlock = ja.blocks.length > 1;
            
            return (
              <tr key={ja.job.id}>
                <td>{ja.job.id}</td>
                <td>{ja.job.size} KB</td>
                <td>
                  {ja.blocks.length > 0 ? (
                    isMultiBlock ? (
                      <span>Multiple blocks ({ja.blocks.length})</span>
                    ) : (
                      `${ja.blocks[0].size} KB`
                    )
                  ) : (
                    '-'
                  )}
                </td>
                <td>
                  {ja.blocks.length > 0 ? (
                    <span className="badge bg-success">Allocated</span>
                  ) : (
                    <span className="badge bg-danger">Unallocated</span>
                  )}
                </td>
                <td>
                  {fragObj && fragObj.frag !== null ? (
                    `${fragObj.frag} KB`
                  ) : (
                    'N/A'
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AllocationTable;


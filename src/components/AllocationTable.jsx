import React from 'react';
import { calculateInternalFragmentation } from '../utils/HelperFunctoin';

function AllocationTable({ blocks, allocations }) {
  const internalFrags = calculateInternalFragmentation(blocks, allocations);

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Memory Block Size</th>
          <th>Job Number</th>
          <th>Job Size</th>
          <th>Status</th>
          <th>Internal Fragmentation</th>
        </tr>
      </thead>
      <tbody>
        {allocations.map((a, i) => {
          const blk = a.blockIdx !== null ? blocks[a.blockIdx] : null;
          const fragObj = internalFrags.find(f => f.id === a.id);
          return (
            <tr key={i}>
              <td>{blk ? `${blk.size} KB` : '-'}</td>
              <td>{a.id}</td>
              <td>{a.size} KB</td>
              <td>{a.blockIdx !== null ? 'Busy' : 'Free'}</td>
              <td>{fragObj && fragObj.frag !== null ? `${fragObj.frag} KB` : 'N/A'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default AllocationTable;


import React, { useContext, useState, useEffect } from 'react';
import { MemoryContext } from '../context/MemoryContext';
import AllocationForm from '../components/AllocationForm';
import AllocationTable from '../components/AllocationTable';
import BestTechniqueButton from '../components/BestTechniqueButton';
import StrategySelector from '../components/StrategySelector';
import Graphs from '../components/Graphs';
import { allocateJobs } from '../services/memoryService';
import {
  calculateExternalFragmentation,
  calculateTotalWastage,
  countUnallocated
} from '../utils/HelperFunctoin';

function SimulatorPage() {
  const { memoryBlocks } = useContext(MemoryContext);
  const [allocationsResult, setAllocationsResult] = useState(null);
  const [metrics, setMetrics] = useState({ external: 0, totalWastage: 0, unallocated: 0 });
  const [selectedStrategy, setSelectedStrategy] = useState('First Fit');
  const [bestStrategyInfo, setBestStrategyInfo] = useState(null);

  const handleAllocate = jobs => {
    const { blocks, allocations } = allocateJobs(memoryBlocks, jobs, selectedStrategy);
    const external = calculateExternalFragmentation(blocks, allocations);
    const totalWastage = calculateTotalWastage(blocks, allocations);
    const unallocated = countUnallocated(allocations);
    setAllocationsResult({ blocks, allocations });
    setMetrics({ external, totalWastage, unallocated });
  };

  useEffect(() => {
    if (!allocationsResult) return;
    const strategies = ['First Fit', 'Best Fit', 'Worst Fit', 'Paging'];
    let bestStrat = null;
    let bestWaste = Infinity;
    let comparisonDetails = [];

    strategies.forEach(strat => {
      const { blocks, allocations } = allocateJobs(memoryBlocks, allocationsResult.allocations.map(j => ({ id: j.id, size: j.size })), strat);
      const waste = calculateTotalWastage(blocks, allocations);
      comparisonDetails.push({ strategy: strat, totalWastage: waste });
      if (waste < bestWaste) {
        bestWaste = waste;
        bestStrat = strat;
      }
    });

    setBestStrategyInfo({ bestStrat, bestWaste, comparisonDetails });
  }, [allocationsResult, memoryBlocks]);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">MemOpt - Job Allocation Simulator</h1>
      <StrategySelector selectedStrategy={selectedStrategy} onChange={setSelectedStrategy} />
      <AllocationForm onAllocate={handleAllocate} />

      {allocationsResult && (
        <>
          <AllocationTable
            blocks={allocationsResult.blocks}
            allocations={allocationsResult.allocations}
          />

          <div className="mb-3">
            <p>External Fragmentation: {metrics.external} KB</p>
            <p>Total Wastage: {metrics.totalWastage} KB</p>
            <p>Unallocated Processes: {metrics.unallocated}</p>
          </div>

          <Graphs stats={{
            memoryUsage: ((1 - metrics.external / allocationsResult.blocks.reduce((a,b)=>a+b.size,0))*100).toFixed(2),
            fragmentation: ((metrics.external / allocationsResult.blocks.reduce((a,b)=>a+b.size,0))*100).toFixed(2)
          }} />

          <BestTechniqueButton bestStrategyInfo={bestStrategyInfo} />
        </>
      )}
    </div>
  );
}

export default SimulatorPage;

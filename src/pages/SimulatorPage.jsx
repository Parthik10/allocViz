// SimulatorPage: Main page for memory allocation simulation and visualization.

import { useContext, useState, useEffect } from 'react';
import { MemoryContext } from '../context/MemoryContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ControlsPanel from '../components/ControlsPanel';
import MemoryVisualizationPanel from '../components/MemoryVisualizationPanel';
import { allocateJobs } from '../services/MemoryService';
import {
  calculateExternalFragmentation,
  calculateTotalWastage,
  countUnallocated
} from '../utils/HelperFunctoin';

function SimulatorPage() {
  const { memoryBlocks, setMemoryBlocks } = useContext(MemoryContext);
  const [allocationsResult, setAllocationsResult] = useState(null);
  const [metrics, setMetrics] = useState({ 
    external: 0, 
    totalWastage: 0, 
    unallocated: 0,
    utilization: 0,
    successRate: 0
  });
  const [selectedStrategy, setSelectedStrategy] = useState('First Fit');
  const [bestStrategyInfo, setBestStrategyInfo] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [inputType, setInputType] = useState('manual');
  const [canSimulate, setCanSimulate] = useState(false);

  const handleConfigChange = (blocks) => {
    setMemoryBlocks(blocks);
    setCanSimulate(true);
  };

  const handleStrategyChange = (strategy) => {
    setSelectedStrategy(strategy);
  };

  const handleProcessesChange = (processes) => {
    handleAllocate(processes);
  };

  const handleAllocate = jobs => {
    setIsAnimating(true);
    const allocations = allocateJobs(memoryBlocks, jobs, selectedStrategy);
    const external = calculateExternalFragmentation(memoryBlocks, allocations);
    const totalWastage = calculateTotalWastage(memoryBlocks, allocations);
    const unallocated = countUnallocated(allocations);
    
    // Calculate additional metrics
    const totalMemory = memoryBlocks.reduce((sum, block) => sum + block.size, 0);
    const usedMemory = memoryBlocks.reduce((sum, block) => 
      sum + (block.allocatedSize || 0), 0);
    const utilization = (usedMemory / totalMemory) * 100;
    const successRate = ((allocations.length - unallocated) / allocations.length) * 100;
    
    setAllocationsResult({ blocks: memoryBlocks, allocations });
    setMetrics({ 
      external, 
      totalWastage, 
      unallocated,
      utilization,
      successRate
    });
    
    // Reset animation state after a delay
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleBlockClick = (blockIndex) => {
    // Handle block click if needed
    console.log('Block clicked:', blockIndex);
  };

  useEffect(() => {
    if (!allocationsResult) return;
    const strategies = ['First Fit', 'Best Fit', 'Worst Fit'];
    let bestStrat = null;
    let bestWaste = Infinity;
    let comparisonDetails = [];

    strategies.forEach(strat => {
      const allocations = allocateJobs(memoryBlocks, allocationsResult.allocations.map(j => ({ id: j.id, size: j.size })), strat);
      const waste = calculateTotalWastage(memoryBlocks, allocations);
      const unallocated = countUnallocated(allocations);
      
      const effectiveWaste = waste + (unallocated * 100);
      
      comparisonDetails.push({ 
        strategy: strat, 
        totalWastage: waste,
        unallocated: unallocated,
        effectiveScore: effectiveWaste 
      });
      
      if (effectiveWaste < bestWaste) {
        bestWaste = effectiveWaste;
        bestStrat = strat;
      }
    });

    setBestStrategyInfo({ 
      bestStrat, 
      bestWaste: comparisonDetails.find(d => d.strategy === bestStrat).totalWastage,
      comparisonDetails 
    });
  }, [allocationsResult, memoryBlocks]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        <div className="container-fluid">
          <div className="row">
            <ControlsPanel
              onConfigChange={handleConfigChange}
              onStrategyChange={handleStrategyChange}
              onProcessesChange={handleProcessesChange}
            />
            <MemoryVisualizationPanel
              memoryBlocks={memoryBlocks}
              allocationsResult={allocationsResult}
              metrics={metrics}
              bestStrategyInfo={bestStrategyInfo}
              handleBlockClick={handleBlockClick}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default SimulatorPage;
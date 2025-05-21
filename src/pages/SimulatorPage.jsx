import { useContext, useState, useEffect } from 'react';
import { MemoryContext } from '../context/MemoryContext';
import StrategySelector from '../components/StrategySelector';
import ProcessSelector from '../components/ProcessSelector';
import AnimatedMemoryVisualizer from '../components/AnimatedMemoryVisualizer';
import MemoryConfig from '../components/MemoryConfig';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { allocateJobs } from '../services/MemoryService';
import {
  calculateExternalFragmentation,
  calculateTotalWastage,
  countUnallocated
} from '../utils/HelperFunctoin';
import ProcessSchedulingGraphs from '../components/ProcessSchedulingGraphs';

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
    const strategies = ['First Fit', 'Best Fit', 'Worst Fit', 'Paging'];
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
            {/* Controls Section */}
            <div className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title fw-bold">
                    <i className="bi bi-gear me-2"></i>
                    Memory Configuration
                  </h5>
                  <MemoryConfig onConfigChange={handleConfigChange} />
                </div>
              </div>

              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title fw-bold">
                    <i className="bi bi-diagram-3 me-2"></i>
                    Allocation Strategy
                  </h5>
                  <StrategySelector onStrategyChange={handleStrategyChange} />
                </div>
              </div>

              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title fw-bold">
                    <i className="bi bi-cpu me-2"></i>
                    Process Input
                  </h5>
                  <ProcessSelector onProcessesChange={handleProcessesChange} />
                </div>
              </div>
            </div>

            {/* Visualization Section */}
            <div className="col-md-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title fw-bold">
                    <i className="bi bi-display me-2"></i>
                    Memory Visualization
                  </h5>
                  <AnimatedMemoryVisualizer 
                    blocks={memoryBlocks} 
                    allocations={allocationsResult?.allocations || []}
                    onBlockClick={handleBlockClick}
                  />
                </div>
              </div>

              {/* Process Scheduling Graphs */}
              <ProcessSchedulingGraphs 
                allocations={allocationsResult?.allocations || []}
                blocks={memoryBlocks}
                metrics={metrics}
              />

              {/* Best Technique Comparison */}
              {bestStrategyInfo && (
                <div className="card mb-4 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title fw-bold">
                      <i className="bi bi-trophy me-2"></i>
                      Best Allocation Technique
                    </h5>
                    <div className="alert alert-success">
                      <i className="bi bi-check-circle me-2"></i>
                      <strong>{bestStrategyInfo.bestStrat}</strong> is the most efficient strategy with total wastage of <strong>{bestStrategyInfo.bestWaste} KB</strong>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-sm table-hover">
                        <thead className="table-dark">
                          <tr>
                            <th>Strategy</th>
                            <th>Total Wastage (KB)</th>
                            <th>Unallocated Jobs</th>
                            <th>Effective Score</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bestStrategyInfo.comparisonDetails.map(({ strategy, totalWastage, unallocated, effectiveScore }) => (
                            <tr key={strategy} className={strategy === bestStrategyInfo.bestStrat ? 'table-success' : ''}>
                              <td>{strategy}</td>
                              <td>{totalWastage}</td>
                              <td>{unallocated}</td>
                              <td>{effectiveScore}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="mt-2 text-muted">
                      <i className="bi bi-info-circle me-2"></i>
                      <small>The best strategy is determined by considering both memory wastage and the number of unallocated jobs.</small>
                    </p>
                  </div>
                </div>
              )}

              {/* Performance Metrics */}
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title fw-bold">
                    <i className="bi bi-graph-up me-2"></i>
                    Performance Metrics
                  </h5>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="text-center p-3 bg-light rounded">
                        <h6 className="text-muted">Memory Utilization</h6>
                        <p className="h4 fw-bold text-primary">{metrics.utilization.toFixed(2)}%</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="text-center p-3 bg-light rounded">
                        <h6 className="text-muted">Allocation Success Rate</h6>
                        <p className="h4 fw-bold text-success">{metrics.successRate.toFixed(2)}%</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="text-center p-3 bg-light rounded">
                        <h6 className="text-muted">External Fragmentation</h6>
                        <p className="h4 fw-bold text-danger">{metrics.external} KB</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default SimulatorPage;

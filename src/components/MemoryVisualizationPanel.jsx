import AnimatedMemoryVisualizer from './AnimatedMemoryVisualizer';
import ProcessSchedulingGraphs from './ProcessSchedulingGraphs';
import BestTechniqueComparison from './BestTechniqueComparison';
import PerformanceMetrics from './PerformanceMetrics';

function MemoryVisualizationPanel({
  memoryBlocks,
  allocationsResult,
  metrics,
  bestStrategyInfo,
  handleBlockClick
}) {
  return (
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
      <ProcessSchedulingGraphs
        allocations={allocationsResult?.allocations || []}
        blocks={memoryBlocks}
        metrics={metrics}
      />
      {bestStrategyInfo && (
        <BestTechniqueComparison bestStrategyInfo={bestStrategyInfo} />
      )}
      <PerformanceMetrics metrics={metrics} />
    </div>
  );
}

export default MemoryVisualizationPanel;
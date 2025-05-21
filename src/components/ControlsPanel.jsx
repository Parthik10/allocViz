// ControlsPanel: Main panel for memory allocation controls.
// Contains MemoryConfig, StrategySelector, and ProcessSelector components.

import MemoryConfig from './MemoryConfig'; // Handles memory size/block configuration
import StrategySelector from './StrategySelector'; // Allows user to select allocation strategy
import ProcessSelector from './ProcessSelector'; // Handles process input and management

function ControlsPanel({ onConfigChange, onStrategyChange, onProcessesChange }) {
  return (
    <div className="col-md-4">
      {/* Memory Configuration Card */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title fw-bold">
            <i className="bi bi-gear me-2"></i>
            Memory Configuration
          </h5>
          <MemoryConfig onConfigChange={onConfigChange} />
        </div>
      </div>
      {/* Allocation Strategy Card */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title fw-bold">
            <i className="bi bi-diagram-3 me-2"></i>
            Allocation Strategy
          </h5>
          <StrategySelector onStrategyChange={onStrategyChange} />
        </div>
      </div>
      {/* Process Input Card */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title fw-bold">
            <i className="bi bi-cpu me-2"></i>
            Process Input
          </h5>
          <ProcessSelector onProcessesChange={onProcessesChange} />
        </div>
      </div>
    </div>
  );
}

export default ControlsPanel;
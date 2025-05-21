import MemoryConfig from './MemoryConfig';
import StrategySelector from './StrategySelector';
import ProcessSelector from './ProcessSelector';

function ControlsPanel({ onConfigChange, onStrategyChange, onProcessesChange }) {
  return (
    <div className="col-md-4">
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title fw-bold">
            <i className="bi bi-gear me-2"></i>
            Memory Configuration
          </h5>
          <MemoryConfig onConfigChange={onConfigChange} />
        </div>
      </div>
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title fw-bold">
            <i className="bi bi-diagram-3 me-2"></i>
            Allocation Strategy
          </h5>
          <StrategySelector onStrategyChange={onStrategyChange} />
        </div>
      </div>
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
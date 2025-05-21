// PerformanceMetrics: Displays summary metrics (utilization, success rate, fragmentation).

function PerformanceMetrics({ metrics }) {
  return (
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
  );
}

export default PerformanceMetrics;
// BestTechniqueComparison: Displays the best allocation strategy and comparison table.

function BestTechniqueComparison({ bestStrategyInfo }) {
  return (
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
  );
}

export default BestTechniqueComparison;
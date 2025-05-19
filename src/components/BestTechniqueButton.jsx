import React from 'react';

function BestTechniqueButton({ bestStrategyInfo }) {
  if (!bestStrategyInfo) return null;

  const { bestStrat, bestWaste, comparisonDetails } = bestStrategyInfo;

  return (
    <div className="mt-3 p-3 border rounded bg-light">
      <h5>Best Allocation Technique</h5>
      <p><strong>{bestStrat}</strong> with total wastage of <strong>{bestWaste} KB</strong></p>
      <h6>Comparison with other strategies:</h6>
      <table className="table table-sm">
        <thead>
          <tr>
            <th>Strategy</th>
            <th>Total Wastage (KB)</th>
            <th>Unallocated Jobs</th>
          </tr>
        </thead>
        <tbody>
          {comparisonDetails.map(({ strategy, totalWastage, unallocated }) => (
            <tr key={strategy} className={strategy === bestStrat ? 'table-success' : ''}>
              <td>{strategy}</td>
              <td>{totalWastage}</td>
              <td>{unallocated}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-2">
        <small>The best strategy is determined by considering both memory wastage and the number of unallocated jobs.</small>
      </p>
    </div>
  );
}

export default BestTechniqueButton;

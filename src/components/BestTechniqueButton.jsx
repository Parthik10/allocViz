import React from 'react';

function BestTechniqueButton({ bestStrategyInfo }) {
  if (!bestStrategyInfo) return null;

  const { bestStrat, bestWaste, comparisonDetails } = bestStrategyInfo;

  return (
    <div className="mt-3 p-3 border rounded bg-light">
      <h5>Best Allocation Technique</h5>
      <p><strong>{bestStrat}</strong> with total wastage of <strong>{bestWaste} KB</strong></p>
      <h6>Comparison with other strategies:</h6>
      <ul>
        {comparisonDetails.map(({ strategy, totalWastage }) => (
          <li key={strategy}>
            {strategy}: {totalWastage} KB {strategy === bestStrat ? '(Best)' : ''}
          </li>
        ))}
      </ul>
      <p>This strategy is considered best because it results in the lowest total wastage of memory.</p>
    </div>
  );
}

export default BestTechniqueButton;


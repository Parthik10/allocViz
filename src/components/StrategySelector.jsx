 // Dropdown to select First Fit, Best Fit, Worst Fit, Paging

 import React from 'react';

function StrategySelector({ selectedStrategy, onChange }) {
    return (
        <div className="mb-3">
            <label className="form-label">Select Allocation Strategy:</label>
            <select
                className="form-select"
                value={selectedStrategy}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="First Fit">First Fit</option>
                <option value="Best Fit">Best Fit</option>
                <option value="Worst Fit">Worst Fit</option>
                <option value="Paging">Paging</option>
            </select>
        </div>
    );
}

export default StrategySelector;

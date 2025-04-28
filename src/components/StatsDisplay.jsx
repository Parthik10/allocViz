// Show fragmentation %, utilization, etc.

import React from 'react';

function StatsDisplay({ stats }) {
    return (
        <div className="row text-center mb-4">
            <div className="col-md-3">
                <h5>Fragmentation</h5>
                <p>{stats.fragmentation}%</p>
            </div>
            <div className="col-md-3">
                <h5>Memory Usage</h5>
                <p>{stats.memoryUsage}%</p>
            </div>
            <div className="col-md-3">
                <h5>Allocation Success</h5>
                <p>{stats.allocationSuccess}%</p>
            </div>
            <div className="col-md-3">
                <h5>Wasted Space</h5>
                <p>{stats.wastedSpace} KB</p>
            </div>
        </div>
    );
}

export default StatsDisplay;

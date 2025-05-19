import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend as RechartsLegend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts';

function Graphs({ stats }) {
  // Parse and validate stats data
  const memoryUsage = parseFloat(stats.memoryUsage) || 0;
  const fragmentation = parseFloat(stats.fragmentation) || 0;
  
  // Ensure values are within valid range (0-100%)
  const validMemoryUsage = Math.min(100, Math.max(0, memoryUsage));
  const validFragmentation = Math.min(100, Math.max(0, fragmentation));
  
  // Prepare data
  const barChartData = [
    { name: 'Memory Usage', value: validMemoryUsage },
    { name: 'Fragmentation', value: validFragmentation }
  ];
  
  const fragmentationData = [
    { name: 'Fragmented Space', value: validFragmentation },
    { name: 'Used Space', value: validMemoryUsage },
    { name: 'Free Space', value: Math.max(0, 100 - validMemoryUsage - validFragmentation) }
  ];
  
  const COLORS = ['#FF8042', '#0088FE', '#00C49F']; // [Fragmented, Used, Free]

  return (
    <div className="row">
      <div className="col-12 mb-3">
        <h5>Memory Allocation Statistics</h5>
      </div>
      
      {/* Bar Chart */}
      <div className="col-md-6">
        <div className="card p-3 mb-3">
          <h5>Memory Utilization</h5>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} label={{ value: '%', position: 'insideLeft', angle: -90 }} />
              <Tooltip formatter={(value) => [`${value.toFixed(2)}%`, 'Value']} />
              <RechartsLegend />
              <Bar dataKey="value" fill="#8884d8" name="Percentage" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart with Legend */}
      <div className="col-md-6">
        <div className="card p-3 mb-3">
          <h5>Memory Distribution</h5>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={fragmentationData}
                dataKey="value"
                outerRadius={100}
                fill="#8884d8"
                label={({name, percent}) => `${name}: ${(percent * 100).toFixed(1)}%`}
              >
                {fragmentationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value.toFixed(2)}%`, 'Percentage']} />
            </PieChart>
          </ResponsiveContainer>

          {/* Custom Legend */}
          <div className="d-flex justify-content-center mt-3">
            {fragmentationData.map((entry, index) => (
              <div key={`legend-${index}`} className="d-flex align-items-center me-4">
                <div
                  style={{
                    width: '15px',
                    height: '15px',
                    backgroundColor: COLORS[index],
                    marginRight: '8px',
                    border: '1px solid #ccc'
                  }}
                />
                <span>{entry.name}: {entry.value.toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Graphs;

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
  // Prepare data
  const barChartData = [
    { name: 'Memory Usage', value: parseFloat(stats.memoryUsage) },
    { name: 'Fragmentation', value: parseFloat(stats.fragmentation) }
  ];
  const fragmentationData = [
    { name: 'Fragmented Space', value: parseFloat(stats.fragmentation) },
    { name: 'Non-fragmented Space', value: 100 - parseFloat(stats.fragmentation) }
  ];
  const COLORS = ['#0088FE', '#00C49F']; // [ Fragmented, Non-fragmented ]

  return (
    <div className="row">
      {/* Bar Chart */}
      <div className="col-md-6">
        <div className="card p-3 mb-3">
          <h5>Memory Utilization Chart</h5>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <RechartsLegend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart with Legend */}
      <div className="col-md-6">
        <div className="card p-3 mb-3">
          <h5>Fragmentation Chart</h5>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={fragmentationData}
                dataKey="value"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {fragmentationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Custom Legend */}
          <div className="d-flex justify-content-center mt-3">
            <div className="d-flex align-items-center me-4">
              <div
                style={{
                  width: '15px',
                  height: '15px',
                  backgroundColor: COLORS[0],
                  marginRight: '8px',
                  border: '1px solid #ccc'
                }}
              />
              <span>Fragmented Space</span>
            </div>
            <div className="d-flex align-items-center">
              <div
                style={{
                  width: '15px',
                  height: '15px',
                  backgroundColor: COLORS[1],
                  marginRight: '8px',
                  border: '1px solid #ccc'
                }}
              />
              <span>Non-fragmented Space</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Graphs;

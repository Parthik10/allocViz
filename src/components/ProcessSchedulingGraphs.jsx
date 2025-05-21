// ProcessSchedulingGraphs: Visualizes process scheduling and memory metrics using charts.

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
  Cell,
  PieChart,
  Pie
} from 'recharts';

function ProcessSchedulingGraphs({ allocations, blocks, metrics }) {
  // Prepare data for Gantt chart
  const ganttData = allocations.map(alloc => ({
    process: alloc.id,
    start: alloc.startTime || 0,
    end: alloc.endTime || 0,
    duration: alloc.duration || 0,
    block: alloc.blockIdx !== null ? `Block ${alloc.blockIdx}` : 'Unallocated'
  }));

  // Prepare data for turnaround time
  const turnaroundData = allocations.map(alloc => ({
    process: alloc.id,
    turnaroundTime: alloc.turnaroundTime || 0,
    waitingTime: alloc.waitingTime || 0,
    burstTime: alloc.burstTime || 0
  }));

  // Prepare data for memory utilization
  const memoryUtilization = blocks.map((block, index) => ({
    block: `Block ${index}`,
    utilization: block.isFree ? 0 : ((block.allocatedSize / block.size) * 100),
    size: block.size,
    allocated: block.allocatedSize || 0
  }));

  // Prepare data for performance metrics pie chart
  const performanceData = [
    { name: 'Memory Utilization', value: metrics.utilization },
    { name: 'Unused Memory', value: 100 - metrics.utilization },
    { name: 'External Fragmentation', value: (metrics.external / blocks.reduce((sum, b) => sum + b.size, 0)) * 100 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  // Calculate averages
  const avgTurnaroundTime = turnaroundData.reduce((acc, curr) => acc + curr.turnaroundTime, 0) / turnaroundData.length || 0;
  const avgWaitingTime = turnaroundData.reduce((acc, curr) => acc + curr.waitingTime, 0) / turnaroundData.length || 0;
  const avgUtilization = memoryUtilization.reduce((acc, curr) => acc + curr.utilization, 0) / memoryUtilization.length || 0;
  const successRate = (allocations.filter(a => a.blockIdx !== null).length / allocations.length * 100) || 0;

  // Custom tooltip for Gantt chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ backgroundColor: 'white', padding: '10px', border: '1px solid #ccc' }}>
          <p className="label">{`Process: ${label}`}</p>
          <p className="desc">{`Duration: ${payload[0].value} ms`}</p>
          <p className="desc">{`Block: ${payload[0].payload.block}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="row">
      {/* Gantt Chart */}
      <div className="col-12 mb-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Process Allocation Timeline</h5>
            <div style={{ width: '100%', height: 300, margin: '20px 0' }}>
              <ResponsiveContainer>
                <BarChart data={ganttData} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 'dataMax + 100']} />
                  <YAxis dataKey="process" type="category" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="duration" fill="#8884d8" name="Duration">
                    {ganttData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.block === 'Unallocated' ? '#ff4d4d' : '#8884d8'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Turnaround Time vs Waiting Time */}
      <div className="col-md-6 mb-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Process Metrics</h5>
            <div style={{ width: '100%', height: 300, margin: '20px 0' }}>
              <ResponsiveContainer>
                <BarChart data={turnaroundData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="process" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="turnaroundTime" fill="#82ca9d" name="Turnaround Time" />
                  <Bar dataKey="waitingTime" fill="#8884d8" name="Waiting Time" />
                  <Bar dataKey="burstTime" fill="#ffc658" name="Burst Time" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics Pie Chart */}
      <div className="col-md-6 mb-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Memory Performance Metrics</h5>
            <div style={{ width: '100%', height: 300, margin: '20px 0' }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={performanceData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  >
                    {performanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Memory Utilization */}
      <div className="col-12 mb-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Memory Block Utilization</h5>
            <div style={{ width: '100%', height: 300, margin: '20px 0' }}>
              <ResponsiveContainer>
                <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="block" type="category" />
                  <YAxis dataKey="utilization" name="Utilization %" />
                  <ZAxis dataKey="size" range={[50, 400]} name="Block Size" />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Legend />
                  <Scatter name="Memory Blocks" data={memoryUtilization} fill="#8884d8">
                    {memoryUtilization.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.utilization > 0 ? '#8884d8' : '#ff4d4d'} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Process Allocation Table */}
      <div className="col-12 mb-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Process Allocation Status</h5>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Process ID</th>
                    <th>Size (KB)</th>
                    <th>Status</th>
                    <th>Block</th>
                    <th>Turnaround Time</th>
                    <th>Waiting Time</th>
                  </tr>
                </thead>
                <tbody>
                  {allocations.map((alloc) => (
                    <tr key={alloc.id}>
                      <td>{alloc.id}</td>
                      <td>{alloc.size}</td>
                      <td>
                        <span className={`badge ${alloc.blockIdx !== null ? 'bg-success' : 'bg-danger'}`}>
                          {alloc.blockIdx !== null ? 'Allocated' : 'Unallocated'}
                        </span>
                      </td>
                      <td>{alloc.blockIdx !== null ? `Block ${alloc.blockIdx}` : 'N/A'}</td>
                      <td>{alloc.turnaroundTime.toFixed(2)} ms</td>
                      <td>{alloc.waitingTime.toFixed(2)} ms</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics Summary */}
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Performance Metrics</h5>
            <div className="row">
              <div className="col-md-3">
                <div className="text-center">
                  <h6>Average Turnaround Time</h6>
                  <p className="h4">{avgTurnaroundTime.toFixed(2)} ms</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center">
                  <h6>Average Waiting Time</h6>
                  <p className="h4">{avgWaitingTime.toFixed(2)} ms</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center">
                  <h6>Memory Utilization</h6>
                  <p className="h4">{avgUtilization.toFixed(2)}%</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center">
                  <h6>Allocation Success Rate</h6>
                  <p className="h4">{successRate.toFixed(2)}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProcessSchedulingGraphs;
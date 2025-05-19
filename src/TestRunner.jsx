import React from 'react';
import ReactDOM from 'react-dom/client';
import MemoryAllocationTest, { runMemoryAllocationTest } from './tests/MemoryAllocationTest';
import { MemoryProvider } from './context/MemoryContext';
import 'bootstrap/dist/css/bootstrap.min.css';

// Run the test immediately and display results
const results = runMemoryAllocationTest();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MemoryProvider>
      <div className="container mt-5">
        <h1>Memory Allocation Test Results</h1>
        <div className="alert alert-info">
          Test completed! Check the console for detailed results.
        </div>
        
        <h2 className="mt-4">Summary</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Strategy</th>
              <th>Allocated Processes</th>
              <th>Unallocated Processes</th>
              <th>Total Wastage (KB)</th>
              <th>External Fragmentation (KB)</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(results).map(([strategy, data]) => (
              <tr key={strategy}>
                <td>{strategy}</td>
                <td>{data.allocations.filter(a => a.blockIdx !== null).length}</td>
                <td>{data.unallocated}</td>
                <td>{data.totalWastage}</td>
                <td>{data.external}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <h2 className="mt-4">Process Allocation Details</h2>
        {Object.entries(results).map(([strategy, data]) => (
          <div key={strategy} className="card mb-4">
            <div className="card-header">
              <h3>{strategy}</h3>
            </div>
            <div className="card-body">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Process ID</th>
                    <th>Size (KB)</th>
                    <th>Status</th>
                    <th>Allocated Block</th>
                    <th>Internal Fragmentation</th>
                  </tr>
                </thead>
                <tbody>
                  {data.allocations.map((alloc) => {
                    const fragInfo = data.internalFrags.find(f => f.id === alloc.id);
                    const blockInfo = alloc.blockIdx !== null ? 
                      data.blocks[alloc.blockIdx] : null;
                    
                    return (
                      <tr key={alloc.id}>
                        <td>{alloc.id}</td>
                        <td>{alloc.size} KB</td>
                        <td>
                          {alloc.blockIdx !== null ? 
                            <span className="badge bg-success">Allocated</span> : 
                            <span className="badge bg-danger">Unallocated</span>
                          }
                        </td>
                        <td>
                          {blockInfo ? 
                            `Block ${alloc.blockIdx} (${blockInfo.size} KB)` : 
                            'N/A'
                          }
                        </td>
                        <td>
                          {fragInfo && fragInfo.frag !== null ? 
                            `${fragInfo.frag} KB` : 
                            'N/A'
                          }
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
        
        <MemoryAllocationTest />
      </div>
    </MemoryProvider>
  </React.StrictMode>
); 
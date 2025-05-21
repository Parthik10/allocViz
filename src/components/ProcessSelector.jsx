// ProcessSelector: Allows manual or preset process input for allocation simulation.

import React, { useState } from 'react';
import processCombinations from '../data/processCombinations.json';

function ProcessSelector({ onProcessesChange }) {
  const [inputType, setInputType] = useState('manual');
  const [processes, setProcesses] = useState([]);
  const [selectedCombination, setSelectedCombination] = useState('');

  const handleInputTypeChange = (e) => {
    const newType = e.target.value;
    setInputType(newType);
    setProcesses([]);
    setSelectedCombination('');
  };

  const handleCombinationSelect = (e) => {
    const combinationId = e.target.value;
    setSelectedCombination(combinationId);
    
    if (combinationId) {
      const selectedProcesses = processCombinations.combinations.find(
        combo => combo.id === combinationId
      )?.processes || [];
      setProcesses(selectedProcesses);
      onProcessesChange(selectedProcesses);
    }
  };

  const handleManualProcessAdd = () => {
    const newProcess = {
      id: `P${processes.length + 1}`,
      size: 100 // Default size
    };
    const updatedProcesses = [...processes, newProcess];
    setProcesses(updatedProcesses);
    onProcessesChange(updatedProcesses);
  };

  const handleProcessSizeChange = (index, size) => {
    const updatedProcesses = processes.map((process, i) => 
      i === index ? { ...process, size: parseInt(size) || 0 } : process
    );
    setProcesses(updatedProcesses);
    onProcessesChange(updatedProcesses);
  };

  const handleProcessRemove = (index) => {
    const updatedProcesses = processes.filter((_, i) => i !== index);
    setProcesses(updatedProcesses);
    onProcessesChange(updatedProcesses);
  };

  return (
    <div>
      <div className="mb-3">
        <label className="form-label">Input Type</label>
        <select 
          className="form-select"
          value={inputType}
          onChange={handleInputTypeChange}
        >
          <option value="manual">Manual Input</option>
          <option value="combination">Process Combinations</option>
        </select>
      </div>

      {inputType === 'combination' ? (
        <div className="mb-3">
          <label className="form-label">Select Process Combination</label>
          <select 
            className="form-select"
            value={selectedCombination}
            onChange={handleCombinationSelect}
          >
            <option value="">Select a combination...</option>
            {processCombinations.combinations.map(combo => (
              <option key={combo.id} value={combo.id}>
                {combo.name} - {combo.description}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div>
          <div className="mb-3">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={handleManualProcessAdd}
            >
              Add Process
            </button>
          </div>

          {processes.map((process, index) => (
            <div key={index} className="mb-2 d-flex align-items-center">
              <div className="flex-grow-1 me-2">
                <label className="form-label">Process {process.id}</label>
                <input
                  type="number"
                  className="form-control"
                  value={process.size}
                  onChange={(e) => handleProcessSizeChange(index, e.target.value)}
                  min="1"
                  placeholder="Size (KB)"
                />
              </div>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleProcessRemove(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {processes.length > 0 && (
        <div className="mt-3">
          <h6>Process List:</h6>
          <ul className="list-group">
            {processes.map((process, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {process.id}
                <span className="badge bg-primary rounded-pill">{process.size} KB</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProcessSelector;
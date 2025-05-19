import React, { useState } from 'react';

function MemoryConfig({ onConfigChange }) {
  const [config, setConfig] = useState({
    blockCount: 5,
    minSize: 100,
    maxSize: 500,
    distribution: 'random' // random, ascending, descending
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate memory blocks based on configuration
    const blocks = [];
    for (let i = 0; i < config.blockCount; i++) {
      let size;
      switch (config.distribution) {
        case 'ascending':
          size = config.minSize + (i * (config.maxSize - config.minSize) / (config.blockCount - 1));
          break;
        case 'descending':
          size = config.maxSize - (i * (config.maxSize - config.minSize) / (config.blockCount - 1));
          break;
        case 'random':
        default:
          size = Math.floor(Math.random() * (config.maxSize - config.minSize + 1)) + config.minSize;
      }
      
      blocks.push({
        id: i,
        size: Math.round(size),
        isFree: true,
        allocatedSize: null
      });
    }

    onConfigChange(blocks);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="blockCount" className="form-label fw-bold">Number of Blocks</label>
        <input
          type="number"
          className="form-control bg-light border-dark"
          id="blockCount"
          name="blockCount"
          min="1"
          max="20"
          value={config.blockCount}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="minSize" className="form-label fw-bold">Minimum Block Size (KB)</label>
        <input
          type="number"
          className="form-control bg-light border-dark"
          id="minSize"
          name="minSize"
          min="50"
          max="1000"
          value={config.minSize}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="maxSize" className="form-label fw-bold">Maximum Block Size (KB)</label>
        <input
          type="number"
          className="form-control bg-light border-dark"
          id="maxSize"
          name="maxSize"
          min="100"
          max="2000"
          value={config.maxSize}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="distribution" className="form-label fw-bold">Block Size Distribution</label>
        <select
          className="form-select bg-light border-dark"
          id="distribution"
          name="distribution"
          value={config.distribution}
          onChange={handleChange}
        >
          <option value="random">Random</option>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>

      <button type="submit" className="btn btn-dark w-100">
        <i className="bi bi-gear me-2"></i>
        Generate Blocks
      </button>
    </form>
  );
}

export default MemoryConfig; 
import React, { useState } from 'react';

function AllocationForm({ onAllocate }) {
  const [count, setCount] = useState(1);
  const [jobs, setJobs] = useState([{ id: 'J1', size: 0 }]);

  const handleCount = e => {
    const n = parseInt(e.target.value) || 1;
    setCount(n);
    setJobs(Array.from({ length: n }, (_, i) => ({ id: `J${i+1}`, size: jobs[i]?.size || 0 })));
  };
  const setJobSize = (i, val) => {
    const arr = [...jobs]; arr[i].size = parseInt(val) || 0; setJobs(arr);
  };

  const submit = e => { e.preventDefault(); onAllocate(jobs); };

  return (
    <form onSubmit={submit} className="mb-4">
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Number of Jobs:</label>
          <input type="number" className="form-control" min="1" value={count} onChange={handleCount} />
        </div>
      </div>
      {jobs.map((job, i) => (
        <div className="row mb-2" key={i}>
          <div className="col-md-2 align-self-center">{job.id}:</div>
          <div className="col-md-4">
            <input
              type="number"
              className="form-control"
              placeholder="Size (KB)"
              value={job.size}
              onChange={e => setJobSize(i, e.target.value)}
              required
            />
          </div>
        </div>
      ))}
      <button type="submit" className="btn btn-primary">Allocate Jobs</button>
    </form>
  );
}

export default AllocationForm;


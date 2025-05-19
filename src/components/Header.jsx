import React from 'react';

function Header() {
  return (
    <header className="bg-dark text-white py-4 mb-4 shadow">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col">
            <h1 className="h3 mb-0 fw-bold">
              <i className="bi bi-memory me-2"></i>
              Memory Allocation Simulator
            </h1>
          </div>
          <div className="col-auto">
            <div className="d-flex align-items-center">
              <span className="h4 mb-0 me-2 fw-bold text-danger">Team Rocket</span>
              <div className="pokeball-icon" style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                border: '2px solid white',
                position: 'relative',
                background: 'linear-gradient(to bottom, #ff1a1a 50%, white 50%)'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  border: '2px solid #333'
                }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header; 
// Header: App title and team branding/logo.

import teamRocketLogo from '../assets/logo.PNG';

function Header() {
  return (
    <header className="bg-dark text-white py-2 mb-4 shadow">
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
              <span className="h4 mb-0 me-2 fw-bold " style={{ color: '#808080' }}>Team Rocket</span>
              <img
                src={teamRocketLogo}
                alt="Team Rocket Logo"
                style={{
                  width: '70px',
                  height: '70px',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 0 6px #0008)'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
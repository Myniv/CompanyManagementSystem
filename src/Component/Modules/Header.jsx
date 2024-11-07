import { NavLink } from "react-router-dom";

const Header = () => {
  const linkStyle = {
    color: "#D3D3D3",
    textDecoration: "none",
    marginRight: "15px",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
  };

  const activeLinkStyle = {
    backgroundColor: "#899499",
    color: "white",
    textDecoration: "none",
    marginRight: "15px",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
  };
  return (
    <header
      className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start py-3 mb-4 border-bottom"
      style={{ backgroundColor: "#36454F", color: "white" }}
    >
      <div className="col-md-3 mb-2 mb-md-0 mx-5" style={{ flexGrow: 1 }}>
        <NavLink
          to="/"
          className="d-inline-flex link-body-emphasis text-decoration-none"
        >
          <img
            className="img-fluid"
            src="/img/logo.png"
            alt="Myniv"
            style={{ width: "40px", height: "40px" }}
          />
          <h2 className="ms-2 text-white center">Company Management</h2>
        </NavLink>
        <title>Library Management</title>
      </div>

      <nav className="navbar navbar-expand-md navbar-dark">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto justify-content-center mb-md-0 nav nav-pills">
            <li className="nav-item">
              <NavLink
                to="/"
                style={({ isActive }) =>
                  isActive ? activeLinkStyle : linkStyle
                }
              >
                Main
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/employees"
                style={({ isActive }) =>
                  isActive ? activeLinkStyle : linkStyle
                }
              >
                Employees
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/departments"
                style={({ isActive }) =>
                  isActive ? activeLinkStyle : linkStyle
                }
              >
                Department
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/projects"
                style={({ isActive }) =>
                  isActive ? activeLinkStyle : linkStyle
                }
              >
                Project
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/assignments"
                style={({ isActive }) =>
                  isActive ? activeLinkStyle : linkStyle
                }
              >
                Assignment
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export { Header };

import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const { user: currentuser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menuItems = [
    {
      label: "Main",
      path: "/",
      visibleForRoles: [
        "Administrator",
        "HR Manager",
        "Department Manager",
        "Employee Supervisor",
        "Employee",
      ],
    },
    {
      label: "Profile",
      path: "/profile",
      visibleForRoles: [
        "Administrator",
        "HR Manager",
        "Department Manager",
        "Employee Supervisor",
        "Employee",
      ],
    },
  ];

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
      className="py-3 mb-4 border-bottom"
      style={{ backgroundColor: "#36454F", color: "white" }}
    >
      <div className="container-fluid">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
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
              <h2 className="ms-2 text-white">Company Management</h2>
            </NavLink>
          </div>

          <nav className="navbar navbar-expand-lg navbar-dark">
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
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    to="/"
                    className="nav-link"
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
                    className="nav-link"
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
                    className="nav-link"
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
                    className="nav-link"
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
                    className="nav-link"
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
        </div>
      </div>
    </header>
  );
};

export { Header };

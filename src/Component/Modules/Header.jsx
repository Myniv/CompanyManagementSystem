import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import LogoutConfirmation from "../Elements/LogoutConfirmation";
import { logout } from "../../redux/Slicer/authSlicer";

const Header = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
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
    {
      label: "Employee",
      path: "/employees",
      visibleForRoles: ["Administrator", "HR Manager", "Employee Supervisor"],
    },
    {
      label: "Department",
      path: "/departments",
      visibleForRoles: ["Administrator", "Department Manager"],
    },
    {
      label: "Projects",
      path: "/projects",
      visibleForRoles: ["Administrator", "Department Manager"],
    },
    {
      label: "Assignments",
      path: "/assignments",
      visibleForRoles: [
        "Administrator",
        "HR Manager",
        "Employee Supervisor",
        "Department Manager",
      ],
    },
    {
      label: "Register",
      path: "/register",
      visibleForRoles: ["Administrator"],
    },
    {
      label: "Login",
      path: "/login",
      isAuthenticated: false,
    },
    {
      label: "Logout",
      isAuthenticated: true,
    },
  ];

  const isMenuVisible = (item) => {
    //for showing all menu to user
    if (item.visibleForAll) {
      return true;
    }

    //for showing pages if are not login yer
    if (item.isAuthenticated === false && !currentUser) {
      return true;
    }

    //for showing logout if already login
    if (item.label === "Logout" && currentUser) {
      return true;
    }

    //for role for spesifict menu
    if (item.visibleForRoles && currentUser?.roles) {
      return item.visibleForRoles.some((role) =>
        currentUser.roles.includes(role)
      );
    }

    return false;
  };

  const handleLogout = () => {
    LogoutConfirmation({
      logout: () => dispatch(logout()),
      nextPage: () => navigate("/"),
    });
  };

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
                {menuItems.filter(isMenuVisible).map((item, index) => (
                  <li className="nav-item" key={index}>
                    <NavLink
                      key={index}
                      to={item.path}
                      onClick={item.label === "Logout" ? handleLogout : null}
                      className="nav-link"
                      style={({ isActive }) => {
                        isActive && !item.label === "Logout"
                          ? activeLinkStyle
                          : linkStyle;
                      }}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          {currentUser && (
            <hd>
              Welcome,{" "}
              <strong>
                {currentUser.user?.userName
                  ? currentUser.user.userName
                  : currentUser.role}
              </strong>
            </hd>
          )}
        </div>
      </div>
    </header>
  );
};

export { Header };

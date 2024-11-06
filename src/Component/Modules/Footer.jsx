import { NavLink } from "react-router-dom";

const Footer = () => {
  const name = "Mulyana";
  const year = new Date().getFullYear();
  return (
    // <div class="d-flex flex-column min-vh-100">
    <footer
      className="p-3 mt-5text-white"
      style={{ backgroundColor: "#36454F", color: "white" }}
    >
      <div className="container">
        <div className="row">
          <div className="col">
            <p className="mb-0 text-left">
              Contact Us
              <br></br>
              <a href="https://www.linkedin.com/">
                <img
                  className="img-fluid"
                  src="/img/LinkedIn_logo.png"
                  alt="Linkedin"
                  style={{ width: "20px", height: "20px" }}
                />
              </a>
              &ensp;
              <a href="https://www.instagram.com/">
                <img
                  className="img-fluid"
                  src="/img/Instagram_logo.png"
                  alt="Instagram"
                  style={{ width: "20px", height: "20px" }}
                />
              </a>
              &ensp;
              <a href="https://www.x.com/">
                <img
                  className="img-fluid"
                  src="/img/Twitter_logo.png"
                  alt="Twitter"
                  style={{ width: "20px", height: "20px" }}
                />
              </a>
            </p>
          </div>
          <div className="col">
            <p className="mb-1 text-center">{`Copyright © ${year}  ${name}. All Rights Reserved`}</p>
          </div>
          <div className="col d-flex justify-content-end">
            <div>
              <NavLink to="/" className="nav-link px-2" style={{color: "#D3D3D3"}}>
                Main
              </NavLink>
              <NavLink to="/employees" className="nav-link px-2" style={{color: "#D3D3D3"}}>
                Employees
              </NavLink>
              <NavLink to="/departments" className="nav-link px-2" style={{color: "#D3D3D3"}}>
                Department
              </NavLink>
            </div>
            <div>
              <NavLink to="/projects" className="nav-link px-2" style={{color: "#D3D3D3"}}>
                Project
              </NavLink>
              <NavLink to="/assignments" className="nav-link px-2" style={{color: "#D3D3D3"}}>
                Assignment
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
    // </  div>
  );
};

export { Footer };

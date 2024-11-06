const Footer = () => {
    const name = "Mulyana";
    const year = new Date().getFullYear();
    return (
      // <div class="d-flex flex-column min-vh-100">
      <footer className="p-3 mt-5 bg-secondary text-white">
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
            <div className="col d-flex justify-content-end align-items-center">
              <a href="/" className="nav-link px-2 text-primary">
                Menu
              </a>
              <a href="#" className="nav-link px-2 text-primary">
                Promotion
              </a>
              <a href="/CustomerPage" className="nav-link px-2 text-primary">
                Customer
              </a>
            </div>
          </div>
        </div>
      </footer>
      // </  div>
    );
  };
  
  export { Footer };
  
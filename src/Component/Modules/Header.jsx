// import { NavLink } from "react-router-dom";

const Header = () => {
  // const currentDate = new Date().hrefDateString();
  return (
    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom bg-secondary text-white">
      <div className="col-md-3 mb-2 mb-md-0 mx-5" style={{ flexGrow: 1 }}>
        <a
          href="/"
          className="d-inline-flex link-body-emphasis text-decoration-none"
        >
          <img
            className="img-fluid"
            src="/img/logo.png"
            alt="Myniv"
            style={{ width: "40px", height: "40px" }}
          />
          <h2 className="mb-0 text-white center">Company Management</h2>
        </a>
        <title>Library Management</title>
      </div>

      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        {/* <p className="text-end">{currentDate}</p> */}
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 nav nav-pills">
          <li className="nav-item">
            <a
              href="/"
              className={({ isActive }) => {
                return isActive ? "nav-link active" : "nav-link";
              }}
            >
              Menu
            </a>
          </li>

          <li className="nav-item">
            <a
              href="/books"
              className={({ isActive }) => {
                return isActive ? "nav-link active" : "nav-link";
              }}
            >
              Books
            </a>
          </li>
          <li className="nav-item">
            <a
              href="/members"
              className={({ isActive }) => {
                return isActive ? "nav-link active" : "nav-link";
              }}
            >
              Members
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export { Header };

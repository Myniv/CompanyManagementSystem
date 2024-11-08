import { Outlet } from "react-router-dom";
import { Header } from "../Modules/Header";
import { Footer } from "../Modules/Footer";

const LandingPage = () => {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <div className="flex-grow-1">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;

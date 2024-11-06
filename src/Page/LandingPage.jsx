import { Outlet } from "react-router-dom";
import { Header } from "../Component/Modules/Header";
import { Footer } from "../Component/Modules/Footer";

const LandingPage = () => {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <div className="flex-grow-">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;

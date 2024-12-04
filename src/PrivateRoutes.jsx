/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRoles }) => {
  const { user } = useSelector((state) => state.auth);

  const hasRequiredRole = () => {
    if (!allowedRoles) {
      return true;
    }

    const returnUser =
      user?.roles?.some((role) => allowedRoles.includes(role)) || false;

    return returnUser;
  };

  if (allowedRoles && !hasRequiredRole()) {
    return <Navigate to="/" />;
  }

  return user ? (
    <div>
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;

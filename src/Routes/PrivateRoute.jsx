import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Loader from "../Components/Loader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loader />
  }

  if (user && user?.email) {
    return children;
  }

 
  return <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
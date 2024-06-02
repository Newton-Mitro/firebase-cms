import { Navigate, useLocation } from "react-router-dom";
import useLoggedInUser from "../hooks/useLoggedInUser";

function PrivateRoute({ children }: any) {
  const [users, isLoading] = useLoggedInUser();
  const location = useLocation();

  if (isLoading) {
    return <div>loading...</div>;
  }

  // [ ] Need to remove null check
  if (users === null) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
}

export default PrivateRoute;

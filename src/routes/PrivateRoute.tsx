import { onAuthStateChanged } from "firebase/auth";
import { Navigate, useLocation } from "react-router-dom";
import { firebase_auth } from "../configs/firebase-config";

interface props {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: props) => {
  const location = useLocation();

  onAuthStateChanged(firebase_auth, (user) => {
    if (!user) {
      return children;
    } else {
      return <Navigate to="/" state={{ from: location }} replace></Navigate>;
    }
  });
};

export default PrivateRoute;

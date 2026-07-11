import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {

  const { user } = useAuth();

  // Firebase auth state load hone ka wait
  if (user === undefined) {
    return <h2 style={{ textAlign: "center", marginTop: "100px" }}>Loading...</h2>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
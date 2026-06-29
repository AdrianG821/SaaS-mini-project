import { Navigate } from "react-router-dom";
import { isTokenExpired } from "../../api/auth"
 
type ProtectedRoute = {
  children: React.ReactNode;
};

export default function ProtectedRoutes ({ children }: ProtectedRoute) {
    const token = localStorage.getItem("token");

    if(!token) {
        return <Navigate to="/login" replace />;
    }

    if (isTokenExpired(token)) {
        localStorage.removeItem("token");
        return <Navigate to="/login" replace />;
    }

    return children;


}
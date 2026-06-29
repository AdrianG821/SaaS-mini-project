import { Navigate } from "react-router-dom";

type ProtectedRoute = {
  children: React.ReactNode;
};

export default function ProtectedRoutes ({ children }: ProtectedRoute) {
    const token = localStorage.getItem("token");

    if(!token) {
        return <Navigate to="/login" replace />;
    }

    return children;


}
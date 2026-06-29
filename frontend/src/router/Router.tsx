import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import ProtectedRoutes from "./ProtectedRoutes";


export default function AppRoutes() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                
                    <Route path="/dashboard" element={
                        <ProtectedRoutes>
                             <Dashboard />
                        </ProtectedRoutes>
                        }/>
                

            </Routes>
        </BrowserRouter>


    )
}
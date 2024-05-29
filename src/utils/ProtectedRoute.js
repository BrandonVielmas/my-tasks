import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../Contexts/UserContext";

export function ProtectedRoute({ redirectPath = '/loggin' }) {
    const { isLogged } = useContext(UserContext);
  
    if (!isLogged) {
      return <Navigate to={redirectPath} replace />;
    }
  
    return <Outlet />;
  }

  export function ProtectedLoggin({ redirectPath = '/' }) {
    const { isLogged } = useContext(UserContext);
  
    if (isLogged) {
      return <Navigate to={redirectPath} replace />;
    }
  
    return <Outlet />;
  }
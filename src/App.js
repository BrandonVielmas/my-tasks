import React from "react";
import { Outlet, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Loggin } from "./pages/Loggin/Loggin";
import { Home } from "./pages/Home/Home";
import { UserProvider } from "./Contexts/UserContext";
import { Board } from "./pages/Board/Board";
import { NavBar } from "./components/NavBar";
import { ProtectedLoggin, ProtectedRoute } from "./utils/ProtectedRoute";

export default function App() {

  return (
      <Router>
        <UserProvider>
          <Routes>
            <Route element={<ProtectedLoggin />}>
              <Route path="/loggin" element={<Loggin />} />
            </Route>
            
            <Route element={<ProtectedRoute />}>
              <Route element={<WithNavbar />}>
                <Route path="/" element={<Home />} />
                <Route path="/view-board" element={<Board />} />
              </Route>
            </Route>
          </Routes>
        </UserProvider>
      </Router>
  );
}

export function WithNavbar() {
  
  return(
    <>
      <NavBar />
      <Outlet />
    </>
  )
}
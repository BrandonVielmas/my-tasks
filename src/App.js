import React from "react";
import { Outlet, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Loggin } from "./pages/Loggin/Loggin";
import { Home } from "./pages/Home/Home";
import { UserProvider } from "./Contexts/UserContext";
import { Board } from "./pages/Board/Board";

export default function App() {
  return (
      <Router>
        <UserProvider>
          <Routes>
            <Route path="/loggin" element={<Loggin />} />
            
            <Route element={<WithNavbar />}>
              <Route path="/" element={<Home />} />
              <Route path="/view-board" element={<Board />} />
            </Route>
          </Routes>
        </UserProvider>
      </Router>
  );
}

export function NavBar() {

  return(
    <h1>Esto esta en todas las paginas</h1>
  )
}

export function WithNavbar() {
  
  return(
    <>
      <NavBar />
      <Outlet />
    </>
  )
}
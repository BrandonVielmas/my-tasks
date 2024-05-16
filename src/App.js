import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard/Dashboard"
import { Loggin } from "./pages/Loggin/Loggin";
import { Home } from "./pages/Home/Home";
import { UserProvider } from "./Contexts/UserContext";

export default function App() {
  return (
      <Router>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/loggin" element={<Loggin />} />
          </Routes>
        </UserProvider>
      </Router>
  );
}

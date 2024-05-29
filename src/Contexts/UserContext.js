import React, { createContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isLogged, setIsLogged] = useState(localStorage.getItem('EstaDentro') === 'true');

  useEffect(() => {
    const savedUserData = localStorage.getItem("userData");

    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }
  }, []);

  const updateUser = (data) => {
    setUserData(data);
    setIsLogged(true);
    localStorage.setItem("userData", JSON.stringify(data));
    localStorage.setItem("EstaDentro", 'true');
  };

  const logoutUser = () => {
    setUserData(null);
    setIsLogged(false);
    localStorage.removeItem("userData");
    localStorage.removeItem("EstaDentro");
  };

  return (
    <UserContext.Provider value={{ userData, isLogged, updateUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

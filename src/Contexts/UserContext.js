import React, { createContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const savedUserData = localStorage.getItem("userData");

        if(savedUserData) {
            setUserData(JSON.parse(savedUserData));
        }
    }, [])

    const updateUser = (data) => {
        setUserData(data);
        localStorage.setItem("userData", JSON.stringify(data));
    }

    return(
        <UserContext.Provider value={{ userData, updateUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;
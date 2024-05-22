import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../Contexts/UserContext";
import { InfoBoard } from "./components/InfoBoard";
import './style.css'

export function Home() {

    const navigate = useNavigate();
    const { userData } = useContext(UserContext);

    useEffect(() => {
        const isLogged = localStorage.getItem('EstaDentro');
        if(!isLogged) {
            navigate("/loggin");
        }

        console.log(userData)
    }, [])

    return(
        <>
            <div>
                <h1>Home</h1>
            </div>

            <h2>Tableros</h2>
            <div id="container-boards">
                {userData && userData.boards && userData.boards.map((board) => (
                    <InfoBoard key={board.id} id={board.id} name={board.name} description={board.description} />
                ))}
            </div>
        </>
    );
}
import React, { useContext } from "react";
import UserContext from "../../Contexts/UserContext";
import { InfoBoard } from "./components/InfoBoard";
import './style.css'

export function Home() {

    const { userData } = useContext(UserContext);

    return(
        <>
            <h1>Tableros</h1>
            <div id="container-boards">
                {userData && userData.boards && userData.boards.map((board) => (
                    <InfoBoard key={board.id} id={board.id} name={board.name} description={board.description} />
                ))}
            </div>
        </>
    );
}
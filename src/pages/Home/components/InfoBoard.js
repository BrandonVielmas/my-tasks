import React, { useContext } from "react";
import '../style.css';
import { useNavigate } from "react-router-dom";
import UserContext from "../../../Contexts/UserContext";

export function InfoBoard(props) {

    const { id, name, description } = props;
    const navigate = useNavigate();
    const { userData } = useContext(UserContext);

    function handleGoToBoard() {
        navigate(`/view-board?board=${id}&user=${userData.userId}`);
    }

    return(
        <div onClick={handleGoToBoard} id="container-board">
            <h1>{name}</h1>
            <p>{description}</p>
        </div>
    );
}
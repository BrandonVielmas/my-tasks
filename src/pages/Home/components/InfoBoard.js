import React from "react";
import '../style.css';

export function InfoBoard(props) {

    const { id, name, description } = props;

    return(
        <div id="container-board">
            <h1>{name}</h1>
            <p>{description}</p>
        </div>
    );
}
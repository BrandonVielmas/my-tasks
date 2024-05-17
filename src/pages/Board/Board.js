import React from "react";
import { useLocation } from "react-router-dom";

export function Board() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const board = queryParams.get('board');
    const user = queryParams.get('user');

    return(
        <>
            <h1>Vista del board</h1>
            <p>Board: {board}</p>
            <p>User: {user}</p>
        </>
    );
}
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../Contexts/UserContext";
import { InfoBoard } from "./components/InfoBoard";
import './style.css'

export function Home() {

    const navigate = useNavigate();
    const { userData } = useContext(UserContext);
    const [menuInfoIsOpen, setMenuInfoIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const isLogged = localStorage.getItem('EstaDentro');
        if(!isLogged) {
            navigate("/loggin");
        }

        console.log(userData)
    }, [])

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [])

    function handleBtnSalir() {
        localStorage.removeItem('EstaDentro');
        localStorage.removeItem('userData');
        navigate("/loggin");
    }

    function handleBtnMenuInfo() {
        setMenuInfoIsOpen(!menuInfoIsOpen);
    }

    function handleClickOutside(event) {
        if(dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setMenuInfoIsOpen(false);
        }
    }

    return(
        <>
            <div className="dropdown" ref={dropdownRef}>
                <button onClick={handleBtnMenuInfo}>O</button>
                {menuInfoIsOpen && (
                    <div className="dropdown-content">
                        <p>{userData && userData.fullName}</p>
                        <p>Ajustes</p>
                        <button onClick={() => handleBtnSalir()}>Salir </button>
                    </div>
                )}
            </div>

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
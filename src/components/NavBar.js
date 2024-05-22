import React, { useRef, useState, useEffect, useContext } from "react"
import UserContext from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom";

export function NavBar() {

    const dropdownRef = useRef(null);
    const [menuInfoIsOpen, setMenuInfoIsOpen] = useState(false);
    const { userData } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [])

    function handleBtnMenuInfo() {
        setMenuInfoIsOpen(!menuInfoIsOpen);
    }

    function handleClickOutside(event) {
        if(dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setMenuInfoIsOpen(false);
        }
    }

    function handleBtnSalir() {
        localStorage.removeItem('EstaDentro');
        localStorage.removeItem('userData');
        navigate("/loggin");
    }

    return(
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
    )
  }
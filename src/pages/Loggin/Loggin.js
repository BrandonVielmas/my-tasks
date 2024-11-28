import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserService } from "../../services/UserService";
import UserContext from "../../Contexts/UserContext";

export function Loggin() {

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const navigate = useNavigate();
    const { updateUser } = useContext(UserContext);
    const userService = new UserService();

    function handleChangeEmail(event) {
        setEmail(event.target.value);
    }

    function handleChangePassword(event) {
        setPassword(event.target.value);
    }

    function handleBtnEntrar() {

        const body = {
            email: email,
            password: password
        };

        userService.UserLoggin(body).then(res => {
            if(res) {
                updateUser(res.data);
                navigate("/");
            }
        }).catch(error => {
            console.error(error);
        })
    }

    return(
        <>
            <h1>Loggin</h1>
            <label>Correo usuario</label>
            <input value={email} onChange={handleChangeEmail} />
            <label>Contrasena</label>
            <input value={password} onChange={handleChangePassword} />
            <button onClick={handleBtnEntrar}>Entrar</button>
        </>
    );
}
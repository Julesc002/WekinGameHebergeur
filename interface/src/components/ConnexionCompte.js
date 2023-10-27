import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { API_URL, APP_URL } from '../config';

function ConnexionAuCompte(){
    const[name, setName]=useState('');
    const[password, setPassword]=useState('');
    const navigate = useNavigate();

    const connectAccount = (name, password,dnaissance,email) =>{
        const data={
            pseudo: name,
            password: password
        }
        axios.post(`${API_URL}/user/connect`,data)
        .then((response) =>{
        console.log(response.data._id);
        localStorage.setItem("account",parseInt(response.data._id));
        window.location.href = `${APP_URL}/`;

        })
        .catch((error) =>console.error(error));
    };

    const handleInputNameChange = (e) => {
        setName(e.target.value);
    };
    const handleInputPasswordChange = (e) => {
        setPassword(e.target.value);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        connectAccount(name,password);
    }

    const handleRetourClick = () => {
        navigate(-1);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Nom :
                    <input
                        type="text"
                        name="Pseudo"
                        value={name}
                        onChange={handleInputNameChange}
                    />
                </label>
                <br/>
                <label>
                    Mot de Passe :
                    <input
                        type="text"
                        name="Mot de Passe"
                        value={password}
                        onChange={handleInputPasswordChange}
                    />
                </label>
                <br />
                <button type="submit">Se connecter</button>
            </form>
            <br/>
            <Link to="/account/new">Pas de Compte? Créer un Compte</Link>
            <button style={{ cursor: 'pointer' }} onClick={handleRetourClick}>Retour</button>
        </div>
    );
}
export default ConnexionAuCompte;
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
        <div class="small-box">
            <form class="flex-down" onSubmit={handleSubmit}>
                <label>
                    Nom :
                    <input
                        type="text"
                        name="Pseudo"
                        value={name}
                        onChange={handleInputNameChange}
                    />
                </label>
                <label>
                    Mot de Passe :
                    <input
                        type="text"
                        name="Mot de Passe"
                        value={password}
                        onChange={handleInputPasswordChange}
                    />
                </label>
                <br/>
                <div class="align-right">
                    <button class="button-highlight text-medium" type="submit">Se connecter</button>
                </div>
            </form>
            <br/>
            <br/>
            <div>
                <div class="text-small">Pas de Compte? <Link to="/account/new">Créer un Compte</Link></div>
                <button class="bottom-near right" onClick={handleRetourClick}>Retour</button>
            </div>
        </div>
    );
}
export default ConnexionAuCompte;
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from '../config';

function CreationDeCompte(){
    const[name, setName]=useState('');
    const[email, setEmail]=useState('');
    const[password, setPassword]=useState('');
    const[dnaissance, setDnaissance]=useState('');
    const navigate = useNavigate();

    const createAccount = (name, password,dnaissance,email) =>{
        const formData=new FormData()
        formData.append('username',name);
        formData.append('password',password);
        formData.append('email',email);
        formData.append('bday',dnaissance);
        axios.post(`${API_URL}/user/new`,formData);
    };

    const handleInputNameChange = (e) => {
        setName(e.target.value);
    };
    const handleInputEmailChange = (e) => {
        setEmail(e.target.value);
    };  
    const handleInputPasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleInputBirthChange = (e) => {
        setDnaissance(e.target.value);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        createAccount(name,password,dnaissance,email);
        navigate(-1);
    }

    const handleRetourClick = () => {
        navigate(-1);
    };

    return (
        <div class="small-box">
            <h2>Nouveau compte : </h2>
            <form class="flex-down" onSubmit={handleSubmit}>
                <label>
                    E-mail :
                    <input
                        type="email"
                        name="Addresse E-Mail"
                        value={email}
                        placeholder='Ex: "adresse@mail.com"'
                        onChange={handleInputEmailChange}
                    />
                </label>
                <label>
                    Pseudo :
                    <input
                        type="text"
                        name="Pseudo"
                        value={name}
                        placeholder='Ex: "Jacob"'
                        onChange={handleInputNameChange}
                    />
                </label>
                <label>
                    Mot de Passe :
                    <input
                        type="password"
                        name="Mot de Passe"
                        value={password}
                        onChange={handleInputPasswordChange}
                    />
                </label>
                <label>
                    Date de naissance :
                    <input
                        type="texte"
                        name="dnaissance"
                        value={dnaissance}
                        placeholder="(mm/dd/yyyy)"
                        onChange={handleInputBirthChange}
                    />
                </label>
                <br />
                <button class="button-highlight text-medium" type="submit">Créer un compte</button>
            </form>
            <br/>
            <div>
                <div class="text-small">Déjà un Compte? <Link to="/account/connect">Se connecter</Link></div>
                <button class="bottom-near right" onClick={handleRetourClick}>Retour</button>
            </div>
        </div>
    );
}
export default CreationDeCompte;
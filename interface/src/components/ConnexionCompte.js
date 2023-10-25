import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

function ConnexionAuCompte(){
    const[name, setName]=useState('');
    const[email, setEmail]=useState('');
    const[password, setPassword]=useState('');
    const[dnaissance, setDnaissance]=useState('');

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
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                E-mail :
                <input
                    type="email"
                    name="Addresse E-Mail"
                    value={email}
                    onChange={handleInputEmailChange}
                />
            </label>
            <br/>
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
            <br/>
            <label>
                Date de naissance (au format mm/dd/yyyy) :
                <input
                    type="texte"
                    name="dnaissance"
                    value={dnaissance}
                    onChange={handleInputBirthChange}
                />
            </label>
            <br />
            <button type="submit">Créer un compte</button>
        </form>
    );
}
export default CreationDeCompte;
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { API_URL, validEmail } from '../config';

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

    const formatToDdMmYyyy = (date) => {
        const parts = date.split("-");
        if (parts.length === 3) {
            const year = parts[0];
            const month = parts[1];
            const day = parts[2];
            return `${day}/${month}/${year}`;
        }
        return date; // En cas d'erreur, renvoyer la date d'origine.
    }

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
        const date = formatToDdMmYyyy(dnaissance)
        console.log(date);
        if (validEmail.test(email)) {
            createAccount(name,password,date,email);
            navigate(-1);
        }
        return "Addresse email ou date de naissance invalide";
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
                    <div class="float-right">
                        <input
                            type="email"
                            name="Addresse E-Mail"
                            value={email}
                            placeholder='Ex: "adresse@mail.com"'
                            onChange={handleInputEmailChange}
                        />
                    </div>
                </label>
                <label>
                    Pseudo :
                    <div class="float-right">
                        <input
                            type="text"
                            name="Pseudo"
                            value={name}
                            placeholder='Ex: "Jacob"'
                            onChange={handleInputNameChange}
                        />
                    </div>
                </label>
                <label>
                    Mot de Passe :
                    <div class="float-right">
                        <input
                            type="password"
                            name="Mot de Passe"
                            value={password}
                            onChange={handleInputPasswordChange}
                        />
                    </div>
                </label>
                <label>
                    Date de naissance :
                    <div class="float-right">
                        <input
                            type="date"
                            name="dnaissance"
                            value={dnaissance}
                            placeholder="(mm/dd/yyyy)"
                            onChange={handleInputBirthChange}
                        />
                    </div>
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
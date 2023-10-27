import React, { useState } from 'react';
import axios from 'axios';
import { API_URL,validEmail} from '../config';
import { Link, useNavigate} from "react-router-dom";

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

    return (
        <div>
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
                        type="password"
                        name="Mot de Passe"
                        value={password}
                        onChange={handleInputPasswordChange}
                    />
                </label>
                <br/>
                <label>
                    Date de naissance (au format dd/mm/yyyy) :
                    <input
                        type="date"
                        name="dnaissance"
                        value={dnaissance}
                        onChange={handleInputBirthChange}
                    />
                </label>
                <br />
                <button type="submit">Créer un compte</button>
            </form>
            <br/>
            <div>
                {!validEmail.test(email) && <p>Addresse E-mail Invalide</p>}
            </div>
            <br/>
            <Link to="/account/connect">Déjà un Compte? Se connecter</Link>
        </div>
    );
}
export default CreationDeCompte;
import React from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import { Link } from 'react-router-dom';

function CreationDeCompte(){

    const createAccount = (name, password,dnaissance,email) =>{
        axios.post('${API_URL}/users/new?username=${name}&password=${password}&dnaissance=${dnaissancel}&email=${email}');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
    };  
    
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nom :
                <input
                    type="text"
                    name="Pseudo"
                    value={name}
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <label>
                E-mail :
                <input
                    type="email"
                    name="Addresse E-Mail"
                    value={email}
                    onChange={handleInputChange}
                />
            </label>
            <label>
                Date de naissance (au format mm/dd/yyyy) :
                <input
                    type="texte"
                    name="dnaissance"
                    value={dnaissance}
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <button type="submit">Créer un compte</button>
        </form>
    );
}
export default CreationDeCompte;
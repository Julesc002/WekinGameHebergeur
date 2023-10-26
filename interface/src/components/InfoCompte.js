import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL, APP_URL } from '../config';

function InfoCompte() {
    const [bday, setbday] = useState('');
    const [nom, setnom] = useState('');

    useEffect(() => {
        const id = localStorage.getItem("account");
        searchDataCompte(id);
    });

    const searchDataCompte = (id) => {
        axios.get(`${API_URL}/user/` + id + '/info').then((res) => {
            setnom(res.data.nom);
            setbday(res.data.bday);
        });
    };

    const deleteDataCompte = () => {
        axios.get(`${API_URL}/user/`+ localStorage.getItem('account') +`/delete`).then(() => {
            setTimeout(() => {
                window.location.href = '/';
            }, 1);
        }).catch((error) => {
            console.error("Erreur lors de la suppression du compte :", error);
        });
    };

    const decoCompte = () => {
        localStorage.removeItem('account');
        window.location.href = `${APP_URL}/`;
        
    };

    return (
        <div>
            <h1>compte de : {nom}</h1>
            <h1>Date de naissance : {bday}</h1>
            <button style={{ cursor: 'pointer' }} onClick={deleteDataCompte}>Supprimer le compte</button>
            <button style={{ cursor: 'pointer' }} onClick={decoCompte}>Se déconnecter</button>
        </div>
    );
}

export default InfoCompte;
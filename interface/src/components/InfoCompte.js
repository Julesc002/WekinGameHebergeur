import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, APP_URL } from '../config';

function InfoCompte() {
    const [bday, setbday] = useState('');
    const [nom, setnom] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        searchDataCompte();
    });

    const searchDataCompte = () => {
        axios.get(`${API_URL}/user/` + localStorage.getItem('account') + '/info').then((res) => {
            setnom(res.data.pseudo);
            setbday(res.data.date_naissance);
        });
    };

    const deleteDataCompte = () => {
        axios.get(`${API_URL}/user/`+ localStorage.getItem('account') +`/delete`).then(() => {
            localStorage.removeItem('account');
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

    const handleRetourClick = () => {
        navigate(-1);
    };

    return (
        <div>
            <h1>compte de : {nom}</h1>
            <h1>Date de naissance : {bday}</h1>
            <button style={{ cursor: 'pointer' }} onClick={deleteDataCompte}>Supprimer le compte</button>
            <button style={{ cursor: 'pointer' }} onClick={decoCompte}>Se déconnecter</button>
            <button style={{ cursor: 'pointer' }} onClick={handleRetourClick}>Retour</button>
        </div>
    );
}

export default InfoCompte;
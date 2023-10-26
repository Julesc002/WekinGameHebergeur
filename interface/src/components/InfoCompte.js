import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from '../config';

function InfoCompte() {
    const { id } = useParams();
    const {compte, setCompte}= useState();
    const navigate = useNavigate();

    const handleRetourClick = () => {
        navigate(-1);
    };

    useEffect(() => {
        searchDataCompte(id);
    });

    const searchDataCompte = (id) => {
        axios.post
        axios.get(`${API_URL}/user/` + id + '/info').then((res) => {
        
        });
    };

    const deleteDataCompte = (id) => {
        axios.delete(`${API_URL}/user/`+ id +`/delete`).then((res) => {
            setTimeout(() => {
                window.location.reload();
            }, 1);
        }).catch((error) => {
            console.error("Erreur lors de la suppression du compte :", error);
        });
    };

    const handleSupprCompte = (id) => {
        const userConfirmed = window.confirm('Cette étape supprimera votre compte ainsi que toutes vos donnée, pour confirmer, veuillez tapez votre mot de passe.');
    
        if (userConfirmed) {
        }
    };

    return (
        <div>
            <h1>compte de : {compte ? compte.nom : ""}</h1>
            <button style={{ cursor: 'pointer' }} onClick={handleSupprCompte}>Supprimer le compte</button>
        </div>
    );
}

export default InfoCompte;
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
        axios.get(`${API_URL}/user/` + id + '/info').then((res) => {
            setCompte(res.data);
        });
    };

    const deleteDataCompte = (id) => {
        axios.delete(`${API_URL}/user/`+ id +`/delete`).then((res) => {
            try{

            } catch {
                
            }
        });
    };

    return (
        <div>
            <h1>compte {compte ? compte.nom : ""}</h1>
            <p>{wiki ? wiki.description : ""}</p>
            <NavLink to="/createCategorie">
                <button style={{ cursor: 'pointer' }}>Ajouter une catérogie</button>
            </NavLink>
            <NavLink to="/createEntry">
                <button style={{ cursor: 'pointer' }}>Ajouter une entrée</button>
            </NavLink>
            {wiki && wiki.categories.map(function (categorie) {
                return (
                    <div>
                        <Link to={`/categorie/${wiki._id}/${categorie.nom}`}>
                            <h3 style={{ cursor: 'pointer' }}>{categorie.nom} :</h3>
                        </Link>
                        {categorie && categorie.entrees.map(function (entree) {
                            return (
                                <Link to={`/entree/${entree._id}`}>
                                    <p style={{ cursor: 'pointer' }}>{entree.nom}</p>
                                </Link>
                            )
                        })}
                    </div>
                )
            })}
            <button style={{ cursor: 'pointer' }} onClick={handleRetourClick}>Retour</button>
        </div>
    );
}

export default InfoCompte;
import axios from "axios";
import { API_URL } from '../config';
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link, NavLink } from "react-router-dom";

function WikiContent() {
    const { id } = useParams();
    const [wiki, setWiki] = useState();
    const navigate = useNavigate();

    const handleRetourClick = () => {
        navigate(-1);
    };

    useEffect(() => {
        searchDataWiki(id);
    });

    const searchDataWiki = (id) => {
        axios.get(`${API_URL}/wiki/` + id + '/content').then((res) => {
            setWiki(res.data);
        });
    };

    return (
        <div>
            <h1>Wiki {wiki ? wiki.nom : ""}</h1>
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

export default WikiContent;
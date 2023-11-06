import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_URL } from '../config';
import AjoutCategorie from "./AjoutCategorie";

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
            <h2>Wiki {wiki ? wiki.nom : ""}</h2>
            <p>{wiki ? wiki.description : ""}</p>
            <h3>Ajouter une catégorie :</h3>
            <AjoutCategorie />
            <Link to={`/wiki/${wiki ? wiki._id : ""}/ajoutEntree`}>
                <button style={{ cursor: 'pointer' }}>Ajouter une entrée</button>
            </Link>
            {wiki && wiki.categories.map(function (categorie) {
                return (
                    <div>
                        <Link to={`/categorie/${wiki._id}/${categorie.nom}`}>
                            <h3 style={{ cursor: 'pointer' }}>{categorie.nom} :</h3>
                        </Link>
                        {categorie && categorie.entrees.map(function (entree) {
                            return (
                                <Link to={`/entree/${entree._id}`}>
                                    <p class="append">{entree.nom}</p>
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
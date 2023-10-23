import axios from "axios";
import { API_URL } from '../config';
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
            <h4>Catégories : </h4>
            {wiki && wiki.categories.map(function (categorie) {
                <h6>{}</h6>
            })}


            <button style={{ cursor: 'pointer' }} onClick={handleRetourClick}>Retour</button>
        </div>
    );
}

export default WikiContent;
import axios from "axios";
import { API_URL } from '../config';
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function DetailCategorie() {
    const { id, nom } = useParams();
    const [entries, setEntries] = useState([]);
    const [wiki, setWiki] = useState();
    const navigate = useNavigate();

    const handleRetourClick = () => {
        navigate(-1);
    };

    useEffect(() => {
        searchDataCategorie(id);
        getWiki(id);
    }, [id]);

    const searchDataCategorie = (id) => {
        axios.get(`${API_URL}/category/` + id + '/' + nom).then((res) => {
            setEntries(res.data);
        });
    };

    const getWiki = (id) => {
        axios.get(`${API_URL}/wiki/` + id).then((res) => {
          setWiki(res.data);
        });
    };

    return (
        <div>
            <h1>Entrées de la catégorie {nom} du wiki {wiki ? wiki.nom : ""} :</h1>
            {entries.length > 0 && entries.map((entry) => (
                <div key={entry._id}>
                    <Link to={`/entree/${entry._id}`}>
                        <p style={{ cursor: 'pointer' }}>{entry.nom}</p>
                    </Link>
                </div>
            ))}
            <button style={{ cursor: 'pointer' }} onClick={handleRetourClick}>Retour</button>
        </div>
    );
}

export default DetailCategorie;
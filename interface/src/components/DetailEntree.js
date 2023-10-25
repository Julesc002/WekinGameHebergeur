import axios from "axios";
import { API_URL } from '../config';
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function DetailEntree() {
    const { id } = useParams();
    const [entry, setEntry] = useState([]);
    const navigate = useNavigate();

    const handleRetourClick = () => {
        navigate(-1);
    };

    useEffect(() => {
        searchDataEntry(id);
    }, [id]);

    const searchDataEntry = (id) => {
        axios.get(`${API_URL}/entry/` + id).then((res) => {
            setEntry(res.data);
        });
    };

    return (
        <div>
            {entry && entry[0] && (
                <div>
                    <Link to={`/wiki/${entry[0].id_wiki}`}>
                        <h1 style={{ cursor: 'pointer' }}>Wiki {entry[0].nom_wiki}</h1>
                    </Link>
                    <h2>Catégories :</h2>
                    {entry[0].categories.map((categorie) => (
                        <Link to={`/categorie/${entry[0].id_wiki}/${categorie}`}>
                            <h2 style={{ cursor: 'pointer' }}>{categorie}</h2>
                        </Link>
                    ))}
                    <h3>{entry[0].nom}</h3>
                    {entry[0].donnees.map((donnee, index) => (
                        <div key={index}>
                            <h4>{donnee.titre}</h4>
                            <p>{donnee.contenu}</p>
                        </div>
                    ))}
                </div>
            )}
            <button style={{ cursor: 'pointer' }} onClick={handleRetourClick}>Retour</button>
        </div>
    );
}

export default DetailEntree;
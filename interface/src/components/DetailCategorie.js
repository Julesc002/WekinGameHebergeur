import axios from "axios";
import { API_URL } from '../config';
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function DetailCategorie() {
    const { id } = useParams();
    const [entries, setEntries] = useState([]);
    const navigate = useNavigate();

    const handleRetourClick = () => {
        navigate(-1);
    };

    useEffect(() => {
        searchDataCategorie(id);
    }, [id]);

    const searchDataCategorie = (id) => {
        axios.get(`${API_URL}/entry/` + id).then((res) => {
            setEntries(res.data);
        });
    };

    return (
        <div>
            {entries.length > 0 && (
                <div>
                    <h1>{entry[0].nom}</h1>
                    {entry[0].donnees.map((donnee, index) => (
                        <div key={index}>
                            <h3>{donnee.titre}</h3>
                            <p>{donnee.contenu}</p>
                        </div>
                    ))}
                </div>
            )}
            <button style={{ cursor: 'pointer' }} onClick={handleRetourClick}>Retour</button>
        </div>
    );
}

export default DetailCategorie;
import axios from "axios";
import { API_URL } from '../config';
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
                    <h1>Wiki {}</h1>
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
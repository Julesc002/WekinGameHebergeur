import axios from "axios";
import { API_URL } from '../config';
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function DetailCategorie() {
    const { id } = useParams();
    const [entry, setEntry] = useState([]);

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
                    <h1>{entry[0].nom}</h1>
                    {entry[0].donnees.map((donnee, index) => (
                        <div key={index}>
                            <h3>{donnee.titre}</h3>
                            <p>{donnee.contenu}</p>
                        </div>
                    ))}
                </div>
            )}
            <Link to={`/`}>
              <button style={{ cursor: 'pointer' }}> Retour </button>
            </Link>
        </div>
    );
}

export default DetailCategorie;
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from '../config';

function AjoutEntree() {
    const { id } = useParams();
    const [name, setName] = useState();
    const [categories, setCategories] = useState();
    const [donnees, setDonnees] = useState([]);
    const navigate = useNavigate();

    const handleRetourClick = () => {
        navigate(-1);
    };

    const handleAjoutClick = () => {
        addEntree(id);
    };

    const majNameEntree = (e) => {
        setName(e.target.value);
    };

    const addEntree = (id) => {
        
    };

    useEffect(() => {
        getCategories(id);
    });

    const getCategories = (id) => {
        axios.get(`${API_URL}/wiki/` + id).then((res) => {
            setCategories(res.data.categories);
        });
    };

    return (
        <div>
            <input type="text" placeholder="Nom de l'entrée" onChange={majNameEntree} />
            {categories && categories.map(function (categorie) {
                return (
                    <div>
                        <input type="checkbox" name={categorie} />
                        <label for={categorie}>{categorie}</label>
                    </div>
                );
            })}
            {donnees && donnees.map(function (donnee) {
                return (
                    <div>
                        
                    </div>
                );
            })}
            <button style={{ cursor: 'pointer' }} onClick={handleAjoutClick}>Ajouter l'entrée</button>
            <button style={{ cursor: 'pointer' }} onClick={handleRetourClick}>Retour</button>
        </div>
    );
}

export default AjoutEntree;
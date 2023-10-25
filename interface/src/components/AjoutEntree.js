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

    const majNameEntree = (e) => {
        setName(e.target.value);
    };

    const addEntree = () => {
        
    };

    const handleAjoutDonnee = () => {
        const nouvelleDonnee = ["", ""];
        const donneesCopie = [...donnees];
        donneesCopie.push(nouvelleDonnee);
        setDonnees(donneesCopie);
    };

    const handleSupprDonnee = (index) => {
        const donneesCopie = [...donnees];
        donneesCopie.splice(index, 1);
        setDonnees(donneesCopie);
    };

    const handleMajDonneeTitle = (e, index) => {
        const donneesCopie = [...donnees];
        donneesCopie[index][0] = e.target.value;
        setDonnees(donneesCopie);
    };

    const handleMajDonneeContent = (e, index) => {
        const donneesCopie = [...donnees];
        donneesCopie[index][1] = e.target.value;
        setDonnees(donneesCopie);
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
            <input type="text" placeholder="Nom de l'entrée" onChange={(e) => majNameEntree(e)} />
            {categories && categories.map(function (categorie) {
                return (
                    <div>
                        <input type="checkbox" name={categorie} />
                        <label for={categorie}>{categorie}</label>
                    </div>
                );
            })}
            {donnees && donnees.map(function (donnee, index) {
                return (
                    <div key={index}>
                        <input type="text" placeholder="Titre" value={donnees[index][0]} onChange={(e) => handleMajDonneeTitle(e, index)} />
                        <textarea value={donnees[index][1]} onChange={(e) => handleMajDonneeContent(e, index)} ></textarea>
                        <button style={{ cursor: 'pointer' }} onClick={() => handleSupprDonnee(index)}>-</button>
                    </div>
                );
            })}
            <button style={{ cursor: 'pointer' }} onClick={handleAjoutDonnee}>+</button>
            <button style={{ cursor: 'pointer' }} onClick={addEntree}>Ajouter l'entrée</button>
            <button style={{ cursor: 'pointer' }} onClick={handleRetourClick}>Retour</button>
        </div>
    );
}

export default AjoutEntree;
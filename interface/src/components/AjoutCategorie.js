import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from '../config';

function AjoutCategorie() {
    const { id } = useParams();
    const [wiki, setWiki] = useState();
    const [recherche, setRecherche] = useState('');

    const majRecherche = (e) => {
        setRecherche(e.target.value);
    };

    useEffect(() => {
        getWiki(id);
    });

    const getWiki = (id) => {
        axios.get(`${API_URL}/wiki/` + id).then((res) => {
        setWiki(res.data);
        });
    };

    function handleAddCategory() {

        const requestData = {
            nom: recherche
        };
        axios.patch( API_URL+'/wiki/'+ id + '/category/create', requestData).then((response) => {
            if (response.data.code === "200") {
                alert('Catégorie ajoutée avec succès');
            } else if (response.data.code === "409") {
                alert('La catégorie existe déjà');
            }
        }).catch((error) => {
            console.error("Erreur lors de l'ajout de la catégorie :", error);
        });
    }

    return (
        <div>
            <h1>Ajout d'une catégorie dans le wiki {wiki ? wiki.nom : ""}:</h1>
            <input type="text" placeholder="Insérer nom" onChange={majRecherche} />
            <button onClick={handleAddCategory}>Ajouter</button>
        </div>
    );
}

export default AjoutCategorie;
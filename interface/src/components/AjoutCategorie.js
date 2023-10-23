import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from '../config';

function AjoutCategorie() {
    const { id, nom } = useParams();
    const [wiki, setWiki] = useState();
    const navigate = useNavigate();
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

    const handleAddCategory = () => {
        if (!categorieExist) {
          // Add category logic
          // You can add the category to the wiki here
            alert('Category added successfully');
        } else {
            alert('Impossible d\'ajouter une catégorie déjà existante');
        }
    };

    function categorieExist(nomCategorie, wikis) {
        // Utilisez la méthode .some() pour vérifier si le nom de catégorie existe dans la liste des wikis
        return wiki.some(wiki => wiki.nom === nomCategorie);
    }

    return (
        <div>
            <h1>Ajout d'une catégorie dans le wiki {wiki ? wiki.nom : ""}:</h1>
            <input type="text" placeholder="Insérer nom" onChange={majRecherche} />
            {recherche !== '' && <h5>Wikis :</h5>}
            {categorieExist ? (
            <p>Impossible d'ajouter une catégorie déjà existante</p>
            ) : (
            wiki.map(function (wiki) {
                return <p key={wiki._id}>{wiki.nom}</p>;
            })
            )}
            <button onClick={handleAddCategory}>Ajouter</button>
        </div>
    );
}

export default AjoutCategorie;
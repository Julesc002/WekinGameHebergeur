import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from '../config';

function AjoutWiki() {
    const { nomParDefaut } = useParams();
    const [nom, setNom] = useState(nomParDefaut);
    const [description, setDescrition] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const majNom = (e) => {
        setNom(e.target.value);
    };

    const majDesc = (e) => {
        setDescrition(e.target.value);
    };

    function handleAddWiki() {
        const requestData = {
            nom: nom,
            description: description,
            adminId : localStorage.getItem('account')
        };
        if (nom.trim().length === 0 || description.trim().length === 0) {
            setErrorMessage("Veuillez compléter les champs textuels");
        } else {
            setErrorMessage("");
            console.log(requestData);
            /*
            axios.patch( API_URL+'/wiki/'+ id + '/category/create', requestData).then((response) => {
                if (response.data.code === "200") {
                    alert('Catégorie ajoutée avec succès');
                    setTimeout(() => {
                        window.location.reload();
                    }, 1);
                } else if (response.data.code === "409") {
                    alert('La catégorie existe déjà');
                }
            }).catch((error) => {
                console.error("Erreur lors de l'ajout de la catégorie :", error);
            });
            */
        }
    }

    return (
        <div>
          {localStorage.getItem('account') === null ? (
            <h2>Vous devez être connecté pour créer un wiki</h2>
          ) : (
            <>
              <h2>Créer un wiki :</h2>
              <input type="text" placeholder="Nom" value={nom} onChange={majNom} />
              <textarea placeholder="Description" onChange={majDesc} />
              <button onClick={handleAddWiki}>Valider</button>
              <p>{errorMessage}</p>
            </>
          )}
        </div>
      );
      
}

export default AjoutWiki;

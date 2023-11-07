import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL, APP_URL } from '../config';

function AjoutWiki() {
    const { nomParDefaut } = useParams();
    const [nom, setNom] = useState(nomParDefaut);
    const [description, setDescrition] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const nav = useNavigate();

    const majNom = (e) => {
        setNom(e.target.value);
    };

    const majDesc = (e) => {
        setDescrition(e.target.value);
    };
    const connect=()=>{
        nav('/account/connect');
    }

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
            axios.post( API_URL+'/wiki/create', requestData).then((response) => {
                alert('Wiki créé avec succès');
                setTimeout(() => {
                    window.location.href = `${APP_URL}/wiki/${response.data._id}`;
                }, 1);
            }).catch((error) => {
                console.error("Erreur lors de la création du wiki :", error);
            });
        }
    }

    return (
        <div>
          {localStorage.getItem('account') === null ? (
            <div>
                <h2>Vous devez être connecté pour créer un wiki</h2>
                <br/>
                <button onClick={connect}>Se connecter</button>
            </div>
          ) : (
            <div class="flex-down">
              <h2>Créer un wiki :</h2>
              <div>
                <input type="text" placeholder="Nom" value={nom} onChange={majNom} />
              </div>
              <textarea rows="10" placeholder="Description" onChange={majDesc} />
              <div>
                  <button class="button-highlight" onClick={handleAddWiki}>Valider</button>
              </div>
              <p>{errorMessage}</p>
            </div>
          )}
        </div>
      );
      
}

export default AjoutWiki;

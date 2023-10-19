import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

function RechercheDeWiki() {
  const [wikis, setWikis] = useState([]);
  const [entrees, setEntrees] = useState([]);
  const [recherche, setRecherche] = useState('');
  const [debouncedRecherche] = useDebouncedValue(recherche, 300);

  useEffect(() => {
    rechercheWikiAPI(debouncedRecherche);
    rechercheEntreeAPI(debouncedRecherche);
  }, [debouncedRecherche]);

  const majRecherche = (e) => {
    setRecherche(e.target.value);
  };

  const rechercheWikiAPI = (query) => {
    axios.get(`${API_URL}/search/wiki?game=` + query).then((res) => {
      setWikis(res.data);
    });
  };

  const rechercheEntreeAPI = (query) => {
    axios.get(`${API_URL}/searchEntry?name=` + query).then((res) => {
      setEntrees(res.data);
    });
  };

  return (
    <div>
      <input type="text" placeholder="Recherche" onChange={majRecherche}></input>
      {recherche !== '' && <h5>Wikis :</h5>}
      {wikis.length === 0 && recherche.length > 1 ? (
        <p>Pas de résultat</p>
      ) : (
        wikis.map(function (wiki) {
          return <p key={wiki._id}>{wiki.nom}</p>;
        })
      )}
      {recherche !== '' && <h5>Entrées :</h5>}
      {entrees.length === 0 && recherche.length > 1 ? (
        <p>Pas de résultat</p>
      ) : (
        entrees.map(function (entree) {
          return (
            <div key={entree._id}>
              <p>{entree.nom} : {entree.wiki.nom}</p>
              <h6>Catégorie(s) :</h6>
                <ul>
                  {entree.categories.map((categorie, index) => (
                    <li key={index}>{categorie}</li>
                  ))}
                </ul>
            </div>
          );
        })
      )}
    </div>
  );
}

//Fonction pour créer un délai dans les requêtes liées aux API et pour annuler la requête dans le cas d'une modification rapide de la barre de recherche
function useDebouncedValue(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [value, delay]);

  return [debouncedValue];
}

export default RechercheDeWiki;

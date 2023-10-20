import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import { Link } from 'react-router-dom';

function RechercheDeWiki() {
  const [wikis, setWikis] = useState([]);
  const [entrees, setEntrees] = useState([]);
  const [mentions, setMentions] = useState([]);
  const [recherche, setRecherche] = useState('');
  const [debouncedRecherche] = useDebouncedValue(recherche, 300);

  useEffect(() => {
    rechercheWikiAPI(debouncedRecherche);
    rechercheEntreeAPI(debouncedRecherche);
    rechercheMentionAPI(debouncedRecherche);
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

  const rechercheMentionAPI = (query) => {
    axios.get(`${API_URL}/searchEntryByDesc?name=` + query).then((res) => {
      setMentions(res.data);
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
            <Link to={`/entree/${entree._id}`}>
              <p style={{ cursor: 'pointer' }}>{entree.nom} : {entree.wiki.nom}</p>
            </Link>
              <h6> Catégorie(s) : </h6>
                <ul>
                  {entree.categories.map((categorie, index) => (
                    <Link to={`/categorie/${entree.wiki._id}/$${categorie}`}>
                      <li style={{ cursor: 'pointer' }} key={index}>{categorie}</li>
                    </Link>
                  ))}
                </ul>
            </div>
          );
        })
      )}
      {recherche !== '' && <h5>{recherche} est mentionné dans :</h5>}
      {mentions.length === 0 && recherche.length > 1 ? (
        <p>Pas de résultat</p>
      ) : (
        mentions.map(function (mention) {
          return (
            <div key={mention._id}>
              <Link to={`/entree/${mention._id}`}>
                <p style={{ cursor: 'pointer' }}>{mention.nom} : {mention.wiki.nom}</p>
              </Link>
              <h6>Catégorie(s) :</h6>
                <ul>
                  {mention.categories.map((categorie, index) => (
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

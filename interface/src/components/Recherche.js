import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { API_URL } from '../config';

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
      <input type="text" placeholder="Recherche" onChange={majRecherche} class="text-medium"></input>
      {recherche !== '' && (
        <div class="popup-search">
          <h4>Wikis :</h4>
          {wikis.length === 0 && recherche.length > 1 ? (
            <div>
              <p class="text-small">Pas de résultat</p>
              <NavLink to="/createWiki">
                <button class="text-small">Créer le wiki {recherche}</button>
              </NavLink>
            </div>
          ) : (
            wikis.map(function (wiki) {
              return(
                <div>
                  <Link to={`/wiki/${wiki._id}`}>
                    <p class="text-small" key={wiki._id}>{wiki.nom}</p>
                  </Link>
                </div>
              )})
          )}
          <h4>Entrées :</h4>
          {entrees.length === 0 && recherche.length > 1 ? (
            <p class="text-small">Pas de résultat</p>
          ) : (
            entrees.map(function (entree) {
              return (
                <div key={entree._id}>
                <Link to={`/entree/${entree._id}`}>
                  <p class="text-small">{entree.nom} : {entree.wiki.nom}</p>
                </Link>
                  <h5> Catégorie(s) : </h5>
                    <ul>
                      {entree.categories.map((categorie, index) => (
                        <Link to={`/categorie/${entree.wiki._id}/${categorie}`}>
                          <li class="text-small" key={index}>{categorie}</li>
                        </Link>
                      ))}
                    </ul>
                </div>
              );
            })
          )}
          <h4>{recherche} est mentionné dans :</h4>
          {mentions.length === 0 && recherche.length > 1 ? (
            <p class="text-small">Pas de résultat</p>
          ) : (
            mentions.map(function (mention) {
              return (
                <div key={mention._id}>
                  <Link to={`/entree/${mention._id}`}>
                    <p class="text-small">{mention.nom} : {mention.wiki.nom}</p>
                  </Link>
                  <h5>Catégorie(s) :</h5>
                    <ul>
                      {mention.categories.map((categorie, index) => (
                        <Link to={`/categorie/${mention.wiki._id}/${categorie}`}>
                          <li class="text-small" key={index}>{categorie}</li>
                        </Link>
                      ))}
                    </ul>
                </div>
              );
            })
          )}
        </div>
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

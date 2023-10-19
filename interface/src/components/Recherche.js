import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_WIKI_URL } from '../config';
import _ from 'lodash';

function Recherche() {
  const [wikis, setWikis] = useState([]);
  const [recherche, setRecherche] = useState('');

  const debouncedSearch = _.debounce((query) => {
    axios.get(`${API_WIKI_URL}/search/wiki?game=` + query).then((res) => {
      const wikis = res.data.map((document) => document.nom);
      setWikis(wikis);
    });
  }, 300);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setRecherche(query);
    debouncedSearch(query);
  };

  const wikisFiltres = wikis.filter(function (nom) {
    return nom.toLowerCase().startsWith(recherche.toLowerCase());
  });

  if (wikis.length === 0 && recherche.length > 1) {
    return (
      <div>
        <input type="text" placeholder="Recherche" onChange={handleInputChange}></input>
        <p>Aucun résultat</p>
      </div>
    );
  } else {
    return (
      <div>
        <input type="text" placeholder="Recherche" onChange={handleInputChange}></input>
        {recherche !== '' &&
          wikis.map(function (nom, index) {
            return <p key={index}>{nom}</p>;
          })}
      </div>
    );
  }
}

export default Recherche;

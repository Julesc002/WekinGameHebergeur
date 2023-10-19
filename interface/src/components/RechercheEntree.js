import React, { useState } from 'react';
import axios from 'axios';
import { API_ENTREE_URL } from '../config';
import _ from 'lodash';

function RechercheEntree() {
  const [entrees, setEntrees] = useState([]);
  const [recherche, setRecherche] = useState('');

  const majRecherche = (e) => {
    setRecherche(e.target.value);
    rechercheAPI(e.target.value);
  };

  const rechercheAPI = _.debounce((query) => {
    axios.get(`${API_ENTREE_URL}/search/wiki?game=` + query).then((res) => {
      const entrees = res.data.map((document) => document.nom);
      setEntrees(entrees);
    });
  }, 300);

  if (entrees.length === 0 && recherche.length > 1) {
    return (
      <div>
        <input type="text" placeholder="Recherche" onChange={majRecherche}></input>
        <p>Aucun résultat</p>
      </div>
    );
  } else {
    return (
      <div>
        <input type="text" placeholder="Recherche" onChange={majRecherche}></input>
        {recherche !== '' &&
          entrees.map(function (nom, index) {
            return <p key={index}>{nom}</p>;
          })}
      </div>
    );
  }
}

export default RechercheEntree;
import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import _ from 'lodash';

function RechercheEntree() {
  const [entrees, setEntrees] = useState([]);
  const [recherche, setRecherche] = useState('');

  const majRecherche = (e) => {
    setRecherche(e.target.value);
    rechercheAPI(e.target.value);
  };

  const rechercheAPI = _.debounce((query) => {
    axios.get(`${API_URL}/searchEntry?name=` + query).then((res) => {
      setEntrees(res.data);
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
          entrees.map(function (entree) {
            return (
                <div key={entree._id}>
                  <p>{entree.nom} : {entree.wiki.nom}</p>
                  <li>
                    Catégorie(s) :
                    <ul>
                      {entree.categories.map((categorie, index) => (
                        <li key={index}>{categorie}</li>
                      ))}
                    </ul>
                  </li>
                </div>
            );    
        })}
      </div>
    );
  }
}

export default RechercheEntree;
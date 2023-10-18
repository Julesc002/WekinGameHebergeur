import React, { useEffect, useState } from 'react';
import axios from "axios";
import { API_WIKI_URL} from '../config';

function Recherche() {
    const [data, setData] = useState([]);
    const [wikis, setWikis] = useState([]);
    const [recherche, setRecherche] = useState("");

    const majRecherche = (e) => {
        setRecherche(e.target.value);
    }

    useEffect(() => {
        axios
            .get(`${API_WIKI_URL}/search/wiki?game=`)
            .then((res) => setData(res.data));        
    }, [])

    useEffect(() => {
        const wikis = data.map(document => document.nom);
        setWikis(wikis);
        console.log(wikis);
    })

    const wikisFiltres = wikis.filter(function(nom) {
        return nom.toLowerCase().startsWith(recherche.toLowerCase());
    });

    if (wikisFiltres.length === 0 && recherche.length > 1) {
        return (
            <div>
                <input type="text" placeholder='Recherche' onChange={majRecherche}></input>
                <p>Aucun résultat</p>
            </div>
        );
    } else {
        return (
            <div>
                <input type="text" placeholder='Recherche' onChange={majRecherche}></input>
                {recherche !== "" && wikisFiltres.map(function(nom, index) {
                    return <p key={index}>{nom}</p>;
                })}
            </div>
        );
    }
}

export default Recherche;
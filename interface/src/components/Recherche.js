import React, { useEffect, useState } from 'react';
import axios from "axios";

function Recherche() {
    const [data, setData] = useState([]);
    const [recherche, setRecherche] = useState("");

    const majRecherche = (e) => {
        setRecherche(e.target.value);
    }

    useEffect(() => {
        axios
            .get(`${API_WIKI_URL}/search/wiki?game=` + recherche)
            .then((res) => setData(res.data));        
    }, [])

    const wikiFiltres = data.filter(function(nom) {
        return wiki.nom.toLowerCase().startsWith(recherche.toLowerCase());
    });
    
    if (wikiFiltres.length === 0) {
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
                {recherche !== "" && nomsFiltres.map(function(wiki) {
                    return <p>{wiki.nom}</p>;
                })}
            </div>
        );
    }
}

export default Recherche;
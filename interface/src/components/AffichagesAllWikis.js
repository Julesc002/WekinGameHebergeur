import axios from "axios";
import { useState, useEffect } from "react";
import { API_URL } from '../config';

function AffichagesAllWikis() {
    const [wikis, setWikis] = useState([]);

    useEffect(() => {
        getAllWikiAPI();
    }, []);

    const getAllWikiAPI = () => {
        axios.get(`${API_URL}/wikis`).then((res) => {
            const groupedWikis = groupByLetter(res.data);
            setWikis(groupedWikis);
        });
    };

    const groupByLetter = (wikis) => {
        const groupedWikis = {};
        wikis.forEach((wiki) => {
            const firstLetter = wiki.title[0].toUpperCase();
            if (!groupedWikis[firstLetter]) {
                groupedWikis[firstLetter] = [wiki];
            } else {
                groupedWikis[firstLetter].push(wiki);
            }
        });
        return groupedWikis;
    };

    return (
        <div>
            {Object.keys(wikis).map((letter) => (
                <div key={letter}>
                    <h2>{letter}</h2>
                    <ul>
                        {wikis[letter].map((wiki) => (
                            <li key={wiki.id}>{wiki.title}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default AffichagesAllWikis;

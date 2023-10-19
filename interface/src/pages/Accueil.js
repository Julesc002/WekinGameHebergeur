import React from 'react';
import Recherche from '../components/Recherche';
import RechercheEntree from '../components/RechercheEntree';

const Home = () => {
    const handleClick = () => {
        window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley';
    };

    return (
        <div>
            <h1 onClick={handleClick}>feur</h1>
            <h4>Recherche de wiki :</h4>
            <Recherche />
            <br/>
            <h4>Recherche d'entrée :</h4>
            <RechercheEntree />
        </div>
    );
};

export default Home;

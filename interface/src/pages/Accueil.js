import React from 'react';
import Recherche from '../components/Recherche';

const Home = () => {
    const handleClick = () => {
        window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    };

    return (
        <div>
            <h1 onClick={handleClick}>WekinGame V0</h1>
            <h4>Rechercher dans tous les wikis :</h4>
            <Recherche />
        </div>
    );
};

export default Home;

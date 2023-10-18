import React from 'react';
import Recherche from '../components/Recherche';

const Home = () => {
    const handleClick = () => {
        window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley';
    };

    return (
        <div>
            <h1 onClick={handleClick}>feur</h1>
            <Recherche />
        </div>
    );
};

export default Home;

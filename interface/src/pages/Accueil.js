import React from 'react';

const Home = () => {
    const handleClick = () => {
        window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley'; // Remplacez par le lien de la vidéo YouTube
    };

    return (
        <div>
            <h1 onClick={handleClick} style={{ cursor: 'pointer' }}>feur</h1>
        </div>
    );
};

export default Home;

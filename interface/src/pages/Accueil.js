import React from 'react';

const Home = () => {
    const handleClick = () => {
        window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley';
    };

    return (
        <div>
            <h1 onClick={handleClick}>feur</h1>
        </div>
    );
};

export default Home;

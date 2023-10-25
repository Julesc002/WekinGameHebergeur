import React from 'react';
import Recherche from '../components/Recherche';
import '../styles/components/_header.css';

function Header() {
    const handleClick = () => {
        window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley';
    };

    return (
    <div className="Header">
      <div>
        <h1 style={{ cursor: 'pointer' }} onClick={handleClick}>WekinGames</h1>
        <h2>Recherche parmis tout les wikis</h2>
      </div>
      <div class="bottom-right"> <Recherche /> </div>
    </div>
  )
}

export default Header
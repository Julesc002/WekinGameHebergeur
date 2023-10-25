import React from 'react';
import { useNavigate } from "react-router-dom";
import Recherche from '../components/Recherche';
import '../styles/components/_header.css';

function Header() {

    const nav = useNavigate();
    
    const handleClickTitle = () => {
        window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley';
    };
    const handleClickLogo = () => {
        nav('/');
    };

    return (
    <div className="Header">
      <div>
        <img style={{ cursor: 'pointer' }} id="logo" src = "/wekin-games-logo.svg" alt="WekinGames logo" onClick={handleClickLogo}/>
      </div>
      <div>
        <h1 style={{ cursor: 'pointer' }} onClick={handleClickTitle}>WekinGames</h1>
        <h2>Recherche parmis tout les wikis</h2>
      </div>
      <div class="bottom-right"> <Recherche /> </div>
    </div>
  )
}

export default Header
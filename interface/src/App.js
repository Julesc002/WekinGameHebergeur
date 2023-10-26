import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ConnexionAuCompte from './components/ConnexionCompte';
import CreationCompte from './components/CreationCompte';
import InfoCompte from './components/InfoCompte';
import Layout from './components/Layout';
import Accueil from './pages/Accueil';
import Categorie from './pages/Categorie';
import Entree from './pages/Entree';
import PageErreur from './pages/PageErreur';
import Wiki from './pages/Wiki';

const App = () => {

  return (
    <Layout>
      <Routes>
        <Route path='*' element={<PageErreur />} />
        <Route path='/' element={<Accueil />} />
        <Route path="/account/new" element={<CreationCompte/>} />
        <Route path="/entree/:id" element={<Entree />} />
        <Route path="/categorie/:id/:nom" element={<Categorie />} />
        <Route path="/wiki/:id/" element={<Wiki />} />
        <Route path="/account/info" element={<InfoCompte/>} />
        <Route path="/account/connect" element={<ConnexionAuCompte/>}/>
      </Routes>
    </Layout>
  );
};

export default App;
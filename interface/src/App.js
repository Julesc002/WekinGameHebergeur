import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Accueil from './pages/Accueil';
import Layout from './components/Layout';
import CreationCompte from './components/CreationCompte';
import Wiki from './pages/Wiki';
import Categorie from './pages/Categorie';
import Entree from './pages/Entree';
import PageErreur from './pages/PageErreur';

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
      </Routes>
    </Layout>
  );
};

export default App;
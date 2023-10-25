import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import Accueil from './pages/Accueil';
import Entree from './pages/Entree';
import PageErreur from './pages/PageErreur';
import Wiki from './pages/Wiki';
import PageAjoutEntree from './pages/PageAjoutEntree';

const App = () => {

  return (
    <Layout>
      <Routes>
        <Route path='*' element={<PageErreur />} />
        <Route path='/' element={<Accueil />} />
        <Route path="/entree/:id" element={<Entree />} />
        <Route path="/wiki/:id/" element={<Wiki />} />
        <Route path="/wiki/:id/ajoutEntree" element={<PageAjoutEntree />} />
      </Routes>
    </Layout>
  );
};

export default App;
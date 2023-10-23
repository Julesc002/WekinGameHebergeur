import React from 'react';
import { Route, Routes } from 'react-router-dom';

import AjoutCategorie from './components/AjoutCategorie';
import DetailCategorie from './components/DetailCategorie';
import DetailEntree from './components/DetailEntree';
import Layout from './components/Layout';
import MessageErreur from './components/MessageErreur';
import WikiContent from './components/WikiContent';
import Accueil from './pages/Accueil';

const App = () => {

  return (
    <Layout>
      <Routes>
        <Route path='*' element={<MessageErreur />} />
        <Route path='/' element={<Accueil />} />
        <Route path="/entree/:id" element={<DetailEntree />} />
        <Route path="/categorie/:id/:nom" element={<DetailCategorie />} />
        <Route path="/wiki/:id/ajoutcategorie" element={<AjoutCategorie />} />
        <Route path="/wiki/:id/" element={<WikiContent />} />
      </Routes>
    </Layout>
  );
};

export default App;
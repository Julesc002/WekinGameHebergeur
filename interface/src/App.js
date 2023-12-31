import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ConnexionAuCompte from './components/ConnexionCompte';
import CreationCompte from './components/CreationCompte';
import InfoCompte from './components/InfoCompte';
import Categorie from './pages/Categorie';
import Wiki from './pages/Wiki';
import Layout from './components/Layout';
import Accueil from './pages/Accueil';
import Entree from './pages/Entree';
import PageErreur from './pages/PageErreur';
import PageAjoutEntree from './pages/PageAjoutEntree';
import PageAjoutWiki from './pages/PageAjoutWiki';
import PageAffichageAllWikis from './pages/PageAffichageAllWikis';
import PageModificationEntree from './pages/PageModificationEntree';
import PageModifierCategorie from './pages/PageModifierCategorie';
import PageAdministrerWiki from './pages/PageAdministrerWiki';

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
        <Route path="/wiki/:id/ajoutEntree" element={<PageAjoutEntree />} />
        <Route path="/createWiki/:nomParDefaut" element={<PageAjoutWiki />} />
        <Route path="/createWiki" element={<PageAjoutWiki />} />
        <Route path="/allWikis" element={<PageAffichageAllWikis />} />
        <Route path="/wiki/:wikiId/entry/:entreeId/update" element={<PageModificationEntree />} />
        <Route path='/wiki/:id/category/:oldCategoryName/update' element={<PageModifierCategorie />}/>
        <Route path="/wiki/:wikiId/admin" element={<PageAdministrerWiki/>} />
      </Routes>
    </Layout>
  );
};

export default App;
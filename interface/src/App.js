import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Accueil from './pages/Accueil';
import Layout from './components/Layout';
import DetailEntree from './components/DetailEntree';

const App = () => {

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Accueil />} />
        <Route path="/entree/:id" element={<DetailEntree />} />
      </Routes>
    </Layout>
  );
};

export default App;
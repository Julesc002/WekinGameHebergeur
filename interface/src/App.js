import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Accueil from './pages/Accueil';
import Layout from './components/Layout';

const App = () => {

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Accueil />} />
      </Routes>
    </Layout>
  );
};

export default App;
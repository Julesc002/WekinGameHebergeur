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


// import React, { useEffect } from 'react';

// function App() {
//   useEffect(() => {
//       window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley';
//   }, []);

//   return (
//     <div className="App">
//       <header className="App-header">
//       </header>
//     </div>
//   );
// }

// export default App;
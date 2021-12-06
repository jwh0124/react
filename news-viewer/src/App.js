import React from 'react';
import { Routes, Route } from '../node_modules/react-router-dom/index';
import NewPage from './pages/NewPage';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<NewPage />}>
          <Route path="/:category" element={<NewPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

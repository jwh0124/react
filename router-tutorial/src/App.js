import React from 'react';
import { Route, Routes } from 'react-router';
import { Link } from 'react-router-dom';
import Profile from './Profile';
import About from './About';
import Home from './Home';

const App = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/profile/velopert">velopert profile</Link>
        </li>
        <li>
          <Link to="/profile/gildong">gildong profile</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile:username" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;

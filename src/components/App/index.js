import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'

import Login from '../Login';
import Dashboard from '../Dashboard';
import Navbar from '../Navbar/Navbar';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    setIsAuthenticated(JSON.parse(localStorage.getItem('is_authenticated')));
  }, []);

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>

    </div>
  );
};

export default App;

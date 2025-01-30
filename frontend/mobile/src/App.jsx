import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Suscribe from './pages/Suscribe';
import LoginPage from './pages/login';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/suscribe" element={<Suscribe />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Home from './pages/Home.jsx';
import LoginPage from './pages/LoginPage.jsx';
import TestLogin from './pages/TestLogin.jsx';

ReactDOM.render(
  (
    <Router>
      {/* Add global elements like navbar outside the switch */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/testlogin" element={<TestLogin />} />
      </Routes>
    </Router>
  ),
  document.getElementById('root')
);
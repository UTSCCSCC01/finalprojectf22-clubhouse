import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';

ReactDOM.render(
  (
    <Router>
      {/* Add global elements like navbar outside the switch */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  ),
  document.getElementById('root')
);
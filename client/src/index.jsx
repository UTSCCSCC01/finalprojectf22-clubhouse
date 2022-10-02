import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Home from './pages/Home.jsx';
import RegisterForm from './pages/RegisterForm.jsx'

ReactDOM.render(
  (
    <Router>
      {/* Add global elements like navbar outside the switch */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register.html" element={<RegisterForm />} />
      </Routes>
    </Router>
  ),
  document.getElementById('root')
);
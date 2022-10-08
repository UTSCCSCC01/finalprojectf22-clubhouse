import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Home from './pages/Home.jsx';
import CreateEvent from './pages/CreateEvent.jsx';
import LoginPage from './pages/LoginPage.jsx';
import TestLogin from './pages/TestLogin.jsx';
import Navbar from './pages/NavBar.jsx';
import Events from './pages/Events.jsx';
import RegisterForm from './pages/RegisterForm.jsx'

ReactDOM.render(
  (
    <Router>
      <Helmet>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Helmet>
      <Navbar />
      {/* Add global elements like navbar outside the switch */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/create-event" element={<CreateEvent />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/testlogin" element={<TestLogin />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/events.html" element={<Events />} />
      </Routes>
    </Router>
  ),
  document.getElementById('root'),
);
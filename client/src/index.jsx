import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Home from './pages/Home.jsx';
import ClubAdminProfilePage from './pages/ClubAdminProfilePage.jsx'

ReactDOM.render(
  (
    <Router>
      <Helmet>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Helmet>
      {/* Add global elements like navbar outside the switch */}
      <Routes>
        <Route exact path="/" element={<Home />} />
      
        <Route exact path={"/club-admin-profile.html"} element={<ClubAdminProfilePage email = "email" description = "description" phoneNumber = "1234567890"
      clubName = "Club Name"
      />} />
      </Routes>
    </Router>
  ),
  document.getElementById('root')
);
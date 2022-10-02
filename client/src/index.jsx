import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Home from './pages/Home.jsx';
import Navbar from './pages/NavBar.jsx';
import Events from './pages/Events.jsx';
// import Navbar from './components/index.jsx'

ReactDOM.render(
  (
    <Router>
      {/* <Navbar /> */}
      {/* Add global elements like navbar outside the switch */}
      <Routes>
        {/* <Route exact path="/" element={<Home />} /> */}
        <Route exact path="/" element={<Navbar />} />
        <Route path="/events.html" element={<Events />} />
      </Routes>
    </Router>
  ),
  document.getElementById('root')
);

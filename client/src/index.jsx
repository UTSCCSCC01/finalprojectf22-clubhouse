import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App.jsx';

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
        <Route exact path={"/club-admin-profile"} element={<ClubAdminProfilePage email = "email" description = "description" phoneNumber = "1234567890"
      clubName = "Club Name"
      />} />
        <Route exact path="/clubs" element={<Clubs />} />
        <Route exact path="/create-event" element={<CreateEvent />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/testlogin" element={<TestLogin />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </Router>
  ),
  document.getElementById('root'),
);
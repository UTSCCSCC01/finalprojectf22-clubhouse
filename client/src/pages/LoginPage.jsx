import React, { Component } from 'react';

import Login from './Login.jsx';

import '../styles.css';
/**
 * A component that aligns displays login form and potentially register form in future.
 * @component
 */
class LoginPage extends Component {
  render() {
    return (
      <div className="loginContainer">
        <center>
          <Login />
        </center>
      </div>
    );
  }
}


export default LoginPage;
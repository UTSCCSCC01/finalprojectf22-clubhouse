import React, { Component } from 'react';

import Login from './Login.jsx';

import '../styles.css';

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
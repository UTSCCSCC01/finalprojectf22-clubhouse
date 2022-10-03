import React, { Component } from 'react';

import Login from './Login.jsx';

import '../styles.css';

class LoginPage extends Component {
  /*constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: '',
      };
    this.submit = this.submit.bind(this);
    this.change = this.change.bind(this);
  }*/
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
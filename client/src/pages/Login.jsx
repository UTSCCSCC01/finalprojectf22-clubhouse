import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form>
        <p>Email: </p><input type="text"></input>
        <p>Password: </p><input type="password"></input>
      </form>
    );
  }
}


export default Login;
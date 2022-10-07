import React, { Component } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import '../styles.css';

/**
 * A component storing the Login form.
 * @component
 */

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: '',
      };
    this.submit = this.submit.bind(this);
    this.change = this.change.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:5001/loginstatus", {
      method: 'get',
      credentials: 'include'
    }).then(response => response.text())
    .then(data => {
      console.log(data);
      if (data != "false") {
        location.href = "http://localhost:3000/testlogin";
      }
    });
  }
  /**
   * Updates state when the login form is modified.
   * @param {Event} event - event containing modified data
   */
  change(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  /**
   * POSTs login form to API when the login form is submitted.
   * @param {Event} event - event containing submitted data
   */
  submit(event) {
    event.preventDefault();
    fetch('http://localhost:5001/login', 
    {
      method: 'post',
      credentials: 'include',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
           "email": this.state.email,
           "password": this.state.password,
      })
    }).then(response => response.text())
      .then(data => {
        var v = JSON.parse(data);
        if (v.valid) {
          location.href = "http://localhost:3000/testlogin";
        } else {
          alert("Incorrect Password!")
        }
      });
  }

  render() {
    return (
      <div>
      <h2>Login</h2>
      <form onSubmit={this.submit}>
        <div>
        <TextField className="loginInput" id="outlined-basic" type="text" name="email" value={this.state.email} onChange={this.change} label="Email" variant="outlined" />
        </div>
        <div>
        <TextField className="loginInput" id="outlined-basic" type="password" name="password" value={this.state.password} onChange={this.change} label="Password" variant="outlined" />
        </div>
        <Button type="submit" variant="contained">Login</Button>
      </form>
      </div>
    );
  }
}


export default Login;
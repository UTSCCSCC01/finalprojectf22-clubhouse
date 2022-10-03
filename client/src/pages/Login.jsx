import React, { Component } from 'react';

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

  change(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  submit(event) {
    event.preventDefault();
    fetch('http://localhost:5001/login', 
    {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
           "email": this.state.email,
           "password": this.state.password,
      })
    }).then(response => response.text())
      .then(data => {
        var v = JSON.parse(data);
        if (v.valid) {
          alert("Logged in!");
        } else {
          alert("Incorrect Password!")
        }
      });
  }

  render() {
    return (
      <form onSubmit={this.submit}>
        <label>
        <p>Email: </p><input type="text" name="email" value={this.state.email} onChange={this.change}></input>
        </label>
        <label>
        <p>Password: </p><input type="password" name="password" value={this.state.password} onChange={this.change}></input>
        </label>
        <br></br>
        <input type="submit" value="Login"></input>
      </form>
    );
  }
}


export default Login;
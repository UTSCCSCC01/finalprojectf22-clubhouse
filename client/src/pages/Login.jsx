import React, { Component } from 'react';
import { TextField, Container, Typography, Grid, Button } from '@material-ui/core'

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
      if (data != "false") {
        location.href = "http://localhost:3000/testlogin"; //redirect if already logged in
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
          if (v.accountType === "club") {
            location.href = "http://localhost:3000/clubhome";
          } else {
            location.href = "http://localhost:3000/home";
          }
        } else {
          alert("Incorrect Password!")
        }
      });
  }

  render() {
    return (
      <div>
      <Typography style={{paddingTop: "200px", paddingBottom: 20}} variant="h2" align="center">Login</Typography>
      <form onSubmit={this.submit}>
      <Container>
      <Grid container direction="column" style={{textAlign: "center"}}>
            <Grid item style={{paddingBottom: 20}}>
            <TextField style={{width:300}} className="loginInput" id="outlined-basic" type="text" name="email" value={this.state.email} onChange={this.change} label="Email" variant="outlined" />
            </Grid>
            <Grid item>
            <TextField style={{width:300}} className="loginInput" id="outlined-basic" type="password" name="password" value={this.state.password} onChange={this.change} label="Password" variant="outlined" />
            </Grid>
            <Grid item>
            <Button variant="contained"  color="primary" style={{width: 300, marginTop: 25}} type="submit">Login</Button>
            </Grid>
      </Grid>
      </Container>
      </form>
      </div>
    );
  }
}


export default Login;
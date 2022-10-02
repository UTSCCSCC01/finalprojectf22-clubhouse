import React, { Component } from 'react';
import { TextField, Container, Typography, Grid, Button } from '@material-ui/core'
import config from  '../../config.json'

class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.submit = this.submit.bind(this);

    this.state = {
      password: "",
      email: "",
      passwordC: "",
      eerror: null,
      pwerror: null
    };
  }

  render() {
    let ee = this.state.eerror !== null;
    let pe = this.state.pwerror !== null;
    return (
      <Container>
        <Typography style={{paddingTop: "200px"}} variant="h2" align="center">Register</Typography>
          <Grid container direction="column" style={{textAlign: "center"}}>
            <Grid item>
              <TextField error={ee} helperText={this.state.eerror} margin="normal" id="email" label="Email" variant="outlined" style={{width: 500}} onChange={this.handleTextFieldChange}/>
            </Grid>
            <Grid item>
              <TextField error={pe} helperText={this.state.pwerror} type="password" margin="normal" id="password" label="Password" variant="outlined" style={{width: 500}} onChange={this.handleTextFieldChange}/>
            </Grid>
            <Grid item>
              <TextField type="password" margin="normal" id="passwordC" label="Confirm Password" variant="outlined" style={{width: 500}} onChange={this.handleTextFieldChange}/>
            </Grid>
            <Grid item>
              <Button variant="contained"  color="primary" style={{width: 300, marginTop: 25}} onClick={this.submit}>Register</Button>
            </Grid>
          </Grid>
      </Container>
    );
  }

  handleTextFieldChange(event) {
    let obj = {};
    obj[event.target.id] = event.target.value; // Uses the id as key - so i only have to write 1 handler
    this.setState(obj)
  }

  submit() {
    this.setState({pwerror: null, eerror: null}) // Reset error states
    // Verification

    if (this.state.password != this.state.passwordC) { // Check if passwords entered are the same
      this.setState({pwerror: "Password does not match"});
      return;
    } else if (this.state.password.length < 5) { // Password too short
      this.setState({pwerror: "Password is shorter than 5 characters"});
      return;
    } else if (!this.state.email.endsWith("@mail.utoronto.ca")) { // Not valid student email
      this.setState({eerror: "Not a valid UofT email address"});
      return;
    }

    const url = config.api_url + "/register" // Now submit
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: this.state.email, password: this.state.password })
    };
    fetch(url, requestOptions)
        .then(response => console.log('Submitted successfully'))
        .catch(error => console.log('Form submit error', error))
  }
}


export default RegisterForm;
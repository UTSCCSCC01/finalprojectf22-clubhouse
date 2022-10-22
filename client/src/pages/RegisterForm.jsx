import React, { Component } from 'react';
import { TextField, Container, Typography, Grid, Button } from '@material-ui/core'
import config from  '../../config.json'

/**
 * RegisterForm
 * @component
 */

class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.submit = this.submit.bind(this);
    this.submitCode = this.submitCode.bind(this);

    this.state = {
      password: "",
      email: "",
      passwordC: "",
      name: "",
      eerror: null,
      pwerror: null,
      scerror: null,
      showVerification: false
    };
  }

  render() {
    let ee = this.state.eerror !== null;
    let pe = this.state.pwerror !== null;
    let ce = this.state.scerror !== null;
    return (
      <Container>
        <Typography style={{paddingTop: "200px"}} variant="h2" align="center">Register</Typography>
          <Grid container direction="column" style={{textAlign: "center"}}>
            <Grid item>
              <TextField margin="normal" id="name" label="Name" variant="outlined" style={{width: 500}} onChange={this.handleTextFieldChange}/>
            </Grid>
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
            {!this.state.showVerification ? null : (
              <div>
                <Grid item>
                  <TextField type="number" error={ce} helperText={this.state.scerror} margin="normal" id="code" label="Code" variant="outlined" style={{width: 500}} onChange={this.handleTextFieldChange}/>
                </Grid>
                <Grid item>
                  <Typography style={{paddingTop: 50}} variant="caption" align="center">Please enter emailed code</Typography>
                </Grid>
                <Grid item>
                  <Button variant="contained"  color="primary" style={{width: 300, marginTop: 25}} onClick={this.submitCode}>Submit Code</Button>
                </Grid>
              </div>
            )}
          </Grid>
      </Container>
    );
  }
  /**
   * Handle text field changes by simply updating the state variable that matches the targets id
   * @param {Event} event Event object that is passed using DOM
   */
  handleTextFieldChange(event) {
    let obj = {};
    obj[event.target.id] = event.target.value; // Uses the id as key - so i only have to write 1 handler
    this.setState(obj)
  }
  /**
   * First phase of registering - simply sending the user's email address to the endpoint for email verification
   */
  async submit() {
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

    const url = config.api_url + "register" // Now submit
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: this.state.email }) // Only need email before verification
    };
    await fetch(url, requestOptions);
    
    // Now in verification phase
    this.setState({ showVerification: true })
  }
  /**
   * Second phase of verification - sending the entered code to the submitCode endpoint, the redirecting if registered
   */
  async submitCode() {
    this.setState({scerror: null}) // Reset error states

    const url = config.api_url + "submitCode" // Now submit
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: this.state.email, password: this.state.password, code: this.state.code, name: this.state.name }) // Only need email before verification
    };
    const responseObj = await fetch(url, requestOptions);

    let response = await responseObj.json();
    //console.log(response);

    if (!response.registered) {
      this.setState({ scerror: response.error });
    } else {
      // Redirect to login
      window.location.replace("/login");
    }
  }
}


export default RegisterForm;
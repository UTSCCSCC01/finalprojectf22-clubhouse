import React, { Component } from 'react';



class TestLogin extends Component {

  constructor(props) {
    super(props);
    this.state = {
        data: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:5001/loginstatus").then(response => response.text())
    .then(data => {
      console.log(data);
    });
  }

  render() {
    return (
      <div>
        <h1>Status</h1>
      </div>
    );
  }
}


export default TestLogin;
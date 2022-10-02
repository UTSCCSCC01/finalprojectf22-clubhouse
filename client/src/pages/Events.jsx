import React, { Component } from 'react';
import  Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container'

class Events extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Container>
            <div>
                <h6>Student Nav Bar</h6>
                <Button variant="outlined" color="primary">Hello</Button>;
            </div>
        </Container>
      
    );
  }
}
export default Events;
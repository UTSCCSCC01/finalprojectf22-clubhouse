import React, { Component } from 'react';
import  Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container'
import Navbar from './NavBar.jsx';

// class Events extends Component {
//   constructor(props) {
//     super(props);
//   }

const Events = () => {
  return (
    
    <Container>
    <div>
        <h6>Student Nav Bar</h6>
        <Button variant="outlined" color="primary">Hello</Button>;
    </div>
    </Container>
  )
}

export default Events;
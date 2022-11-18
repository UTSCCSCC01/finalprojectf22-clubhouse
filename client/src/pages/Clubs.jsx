import React, { Component } from "react";
import axios from 'axios';
import ClubCard from "./ClubCard.jsx";
import { useEffect,useState } from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import '../styles.css';

/**
 * A component used for browsing clubs.
 * @component
 */

class Clubs extends Component{

  state = {
    clubName: '',
    clubDesc: '',
    clubPhone: '',
    email: '',
    clubs: []
  };


  componentDidMount = async () => {
    await this.getClubInfo();
  };

  getClubInfo = () => {
    return axios.get('http://127.0.0.1:5001/clubs')
      .then((response) => {
        const data = response.data;
        this.setState({ clubs: data})
        console.log('Data has been received!');
      })
      .catch(() => {
        alert('Error receiving data!');
      });
  }

  /**
   * Used to display club info from the db
   * @param {Clubs} clubs - information containing basic club registration
   */

  displayClubInfo = (clubs) => {
    if (!clubs.length) return null;
    return clubs.map((club, index) => (


      <Grid item key={index} xs={12} sm={6} md={4}>
        <ClubCard key={index} eImage={club.image} cName={club.clubName} cDesc={club.clubDesc} cPhone={club.clubPhone} cEmail={club.email}></ClubCard>
      </Grid>
    ));
  }

  render() {
    console.log('State: ', this.state);

    return(
      <Container sx={{ py: 4, px: 4}} maxWidth="lg">
        <Typography style={{padding: "50px 50px 50px 50px"}} variant="h2" align="center">Browse All Clubs</Typography>
      <Grid container spacing={3}>
          {this.displayClubInfo(this.state.clubs)}
      </Grid>
      </Container>
    )
  }
}

export default Clubs;
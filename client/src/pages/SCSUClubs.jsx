import React, { Component } from "react";
import axios from 'axios';
import SCSUClubCard from "./SCSUClubCard.jsx";
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

class SCSUClubs extends Component{

  state = {
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
    if (!clubs.length) return (<Typography variant="h5" color="#bbbbbb" m={4} width="100%" textAlign="center">No clubs :(</Typography>);
    return clubs.map((club, index) => (
      <Grid sx={{ m: 2 }} item key={index}>
        <SCSUClubCard key={index} list={this.state.clubs} updateList={(updated) => this.setState({clubs: updated})} cKey={club._id} cImage={club.image} cName={club.clubName} cPhone={club.clubPhone} cEmail={club.email}></SCSUClubCard>
      </Grid>
    ));
  }

  render() {
    console.log('State: ', this.state);
    return(
      <Container sx={{ mt: "120px", px: 4}} maxWidth="lg">
        <Typography variant="h2" align="center" gutterBottom >Browse All Clubs</Typography>
      <Grid container mt="24px">
        {this.displayClubInfo(this.state.clubs)}
      </Grid>
      </Container>
    )
  }
}

export default SCSUClubs;
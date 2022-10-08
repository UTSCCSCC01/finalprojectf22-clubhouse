import React, { Component } from "react";
import axios from 'axios';
import ClubCard from "./ClubCard.jsx";
import { useEffect,useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import { PostAddSharp } from "@mui/icons-material";
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
      <ClubCard key={index} eImage={club.image} cName={club.clubName} cDesc={club.clubDesc} cPhone={club.clubPhone} cEmail={club.email}></ClubCard>
      
      /*<div key={index}>
        <Box m={2} pt={3}>
          <Typography style={{paddingtop: "10px"}} variant="h4" align="left">{club.clubName}</Typography>
          <p><b>{club.clubDesc}</b></p>
          <p>{club.clubPhone}</p>
          <p>{club.email}</p>
        </Box>
      </div>*/
    ));
  }

  render() {
    console.log('State: ', this.state);
    return(
      <div>
        <Typography style={{padding: "50px 50px 50px 50px"}} variant="h2" align="center">Browse All Clubs</Typography>
        <div className="club-">
          {this.displayClubInfo(this.state.clubs)}
        </div>
      </div>
    )
  }
}

export default Clubs;
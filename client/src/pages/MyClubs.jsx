import React, { Component } from "react";
import axios from 'axios';
import MyClubsCard from "./MyClubsCard.jsx";
import { useEffect,useState } from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { getCookie } from "../libraries/cookieDAO.js";

import '../styles.css';

/**
 * A component used for browsing clubs.
 * @component
 */

function MyClubs() {

  const [clubs, setClubs] = useState([]);
  const email = getCookie("username");

   /**
   * Fetch and set the clubs of the logged-in user from the database (club-members collection)
   * 
   */
    useEffect(  ()  => {
      const fetchclubs = async () => {
          console.log(email);
          const res = await fetch("http://127.0.0.1:5001/club/myclubs/" + email);
          const data = await res.json();
          setClubs(data);
      } 
      fetchclubs();
    },[] );

  /**
   * Used to display club info from the db
   * @param {Clubs} clubs - information containing basic club registration
   */
  
  const displayClubInfo = (clubs) => {
    if (!clubs.length) return null;
    return clubs.map((club, index) => (
      <Grid item key={index} xs={12} sm={6} md={4}>
        <MyClubsCard key={index} cName={club.clubName}></MyClubsCard>
      </Grid>
    ));
  }

  return(
    <Container sx={{ py: 4, px: 4}} maxWidth="lg">
      <Typography style={{padding: "50px 50px 50px 50px"}} variant="h2" align="center">Browse Followed Clubs</Typography>
      <Grid container spacing={3}>
        {displayClubInfo(clubs)}
      </Grid>
    </Container>
  )
}

export default MyClubs;
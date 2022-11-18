import React, { Component } from "react";
import axios from 'axios';
import MyClubsCard from "./MyClubsCard.jsx";
import { useEffect,useState } from "react";
import EventCard from "./StudentEventCard.jsx";

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { getCookie } from "../libraries/cookieDAO.js";

import '../styles.css';
import StudentEventCard from "./StudentEventCard.jsx";

/**
 * A component used for browsing events.
 * @component
 */

function MyEvents() {

  const [events, setevents] = useState([]);
  const email = getCookie("username");

   /**
   * Fetch and set the members of the events from the database 
   * 
   */
    useEffect(  ()  => {
      const fetchevents = async () => {
          console.log(email);
          const res = await fetch("http://127.0.0.1:5001/club/myevents/" + email);
          const data = await res.json();
          setevents(data);
      } 
      fetchevents();
    },[] );

  /**
   * Used to display event info from the db
   * @param {events} events - 
   */
  
  const displayClubInfo = (events) => {
    if (!events.length) return <Typography variant="h5" color="#bbbbbb" m={6} width="100%" textAlign="center">You have no upcoming events :(</Typography>;
    return events.map((club, index) => (
      <Grid item key={index} m={2}>
        <EventCard key={club._id} eKey = {club._id} cName={club.clubName} eName={club.eventName} eDate={club.eventDate} eJoin={club.eventJoin} eImage={club.eventImage} eStartTime={club.eventStartTime} eEndTime={club.eventEndTime} eLoc={club.eventLoc} eTags={club.eventTags} eDesc={club.eventDesc} eAttendees={club.eventAttendees}/>
      </Grid>
    ));
  }

  return(
    <Container sx={{ display:"block", py: 4, px: 4}} maxWidth="lg">
      <Grid container>
        {displayClubInfo(events)}
      </Grid>
    </Container>
  )
}

export default MyEvents;
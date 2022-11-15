import React, { Component } from "react";
import axios from 'axios';
import MyClubsCard from "./MyClubsCard.jsx";
import { useEffect,useState } from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { getCookie } from "../libraries/cookieDAO.js";
import AllClubsCard from "./AllClubsCard.jsx";
import '../styles.css';

/**
 * A component used for browsing clubs.
 * @component
 */

function MyClubs() {

  const [clubs, setClubs] = useState([]);
  const [clubs2, setClubs2] = useState([]);
  useEffect(() => {
    const getclubs = async ()=>{
      const res = await fetch('http://127.0.0.1:5001/clubs');
      const data = await res.json();
      setClubs2(data); 
    };
    getclubs();
  }, []);
  const email = getCookie("username");

   /**
   * Fetch and set the members of the club from the database (club-members collection)
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
  

  

  return(
    <Container sx={{ py: 4, px: 4}} maxWidth="lg">
      <Grid container spacing={3}>
      { clubs2.map((item) => {
      for (const a of clubs) {
        if ( a.clubName === item.clubName ){
          return (<Grid item key={item}>
            <AllClubsCard key={item._id}  cName={item.clubName} cPhone={item.clubPhone} cDesc={item.clubDesc} cEmail={item.email} cImage={item.image}  cTags={item.clubTags}/>
           </Grid>)
        }
        else{
          return (<Grid item key={item}></Grid>)
        }
      }
      
            })}
      </Grid>
    </Container>
  )
}

export default MyClubs;
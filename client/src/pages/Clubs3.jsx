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
import Checkbox from '@mui/material/Checkbox';
import '../styles.css';

/**
 * A component used for browsing clubs.
 * @component
 */


function Clubs() {
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

      const [tagName, setTagName] = React.useState([]);
    const handleChangeTag = (event) => {
      const {
        target: { value },
      } = event;
      setTagName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };
    let tags = [ "arts", "sports", "culture"];

    return(
        <>
        <Container sx={{ py: 4, px: 4}} maxWidth="lg">
          <Typography style={{padding: "50px 50px 50px 50px"}} variant="h2" align="center">Browse All Clubs</Typography>
          <FormControl sx={{ m: 2, width: 150, marginLeft: '980px' }} size="small">
            <InputLabel id="multiple-checkbox-label">Categories</InputLabel>
                    <Select
                      labelId="multiple-checkbox-label"
                      id="multiple-checkbox"
                      multiple
                      value={tagName}
                      onChange={handleChangeTag}
                      input={<OutlinedInput label="Tag" />}
                      renderValue={(selected) => selected.join(', ')}
                      MenuProps={MenuProps}
                    >
                      {tags.map((tag) => (
                        <MenuItem key={tag} value={tag}>
                          <Checkbox checked={tagName.indexOf(tag) > -1} />
                          <ListItemText primary={tag} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
        <Grid container spacing={3}>
            {this.displayClubInfo(this.state.clubs)}
        </Grid>
        </Container>
        </>
      )
}
export default Clubs;
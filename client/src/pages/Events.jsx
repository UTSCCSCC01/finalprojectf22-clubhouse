import React from "react";
import EventCard from "./EventCard.jsx";
import { useEffect,useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function Events(props) {
    const [filter, setFilter] = React.useState('');

    const handleChange = (event) => {
      setFilter(event.target.value);
      
    };
  const url = 'http://127.0.0.1:5001/events';
  const [items, setItems ] = useState([]);
  const tags = [];
  
  useEffect(() => {
    const getevents = async ()=>{
      const res = await fetch(url); //+"?page=1"
        const data = await res.json();
        setItems(data);
    };
    getevents();
  },[]);
    
  return (
    <div>
      <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 6}}>         
          <Container maxWidth="lg" >
            <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>  Upcoming Events</Typography>
            
            <FormControl sx ={{ minWidth: 120, marginLeft: '850px'}} variant="outlined" size="small">
                <InputLabel id="simple-select-label" >Sort by</InputLabel>
                <Select
                    labelId="simple-select-label"
                    id="simple-select"
                    value={filter}
                    label="Sort by"
                    onChange={handleChange}
                >
                    <MenuItem value={'Empty'}> </MenuItem>
                    <MenuItem value={"Date added"}>Date added</MenuItem>
                    <MenuItem value={"Clubs"}>Clubs</MenuItem>
                    <MenuItem value={"Categories"}>Categories</MenuItem>
                </Select>
                </FormControl>
            </Container>
            
      </Box>
      
      <Container sx={{ py: 4 }} maxWidth="md">
          <Grid container spacing={5}>
            {items && items.map((item) => (
              <Grid item key={item} xs={12} sm={6} md={4}>
                <EventCard key={item._id} cName={item.clubName} eName={item.eventName} eDate={item.eventDate} eJoin={item.eventJoin} eImage={item.eventImage}/>
              </Grid>
            ))}
          </Grid>
        </Container>
   </div>   
  );
}  


export default Events;
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
import dateFormat from 'dateformat';

function Events(props) {
    const [filter, setFilter] = React.useState('');

    const handleChange = (event) => {
      setFilter(event.target.value); 
    };

  const [items, setItems ] = useState([]);
  const tags = [];
  const now = new Date();

  useEffect(() => {
    const getevents = async ()=>{
      
      const changeFilter = (filter) => {
        let url = 'http://127.0.0.1:5001/events';
        if (filter==="Date"){ url = 'http://127.0.0.1:5001/eventssortByDate';}
        else if (filter==="Clubs"){ url = 'http://127.0.0.1:5001/eventssortByClubs';}
        else if (filter==="Categories"){url = 'http://127.0.0.1:5001/eventssortByCategories';}
        else{ url = 'http://127.0.0.1:5001/events';}
        return url;
      };
      const res = await fetch(changeFilter(filter));
      console.log(changeFilter(filter));
      const data = await res.json();
        setItems(data);
    };
    getevents();
  },[filter]);
  
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
                    <MenuItem value={"Empty"}> </MenuItem>
                    <MenuItem value={"Date"}>Date</MenuItem>
                    <MenuItem value={"Clubs"}>Clubs</MenuItem>
                    <MenuItem value={"Categories"}>Categories</MenuItem>
                </Select>
                </FormControl>
            </Container>
            
      </Box>
      
      <Container sx={{ py: 4 }} maxWidth="md">
          <Grid container spacing={5}>
            {items && items.filter(item=>item.eventDate>=dateFormat(now, "isoDateTime")).map((item) => (
              <Grid item key={item} xs={12} sm={6} md={4}>
                <EventCard key={item._id} cName={item.clubName} eName={item.eventName} eDate={item.eventDate} eJoin={item.eventJoin} eImage={item.eventImage} eStartTime={item.eventStartTime} eEndTime={item.eventEndTime} eLoc={item.eventLoc}/>
              </Grid>
            ))}
          </Grid>
        </Container>
   </div>   
  );
}  


export default Events;
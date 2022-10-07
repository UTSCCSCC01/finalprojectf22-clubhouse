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
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { DisabledByDefault } from "@mui/icons-material";

function Events(props) {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const tags = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];

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
    const [filter, setFilter] = React.useState('');

    const handleChange = (event) => {
      setFilter(event.target.value); 
    };

  const [items, setItems ] = useState([]);
  const now = new Date();
  useEffect(() => {
    const getevents = async ()=>{
      
      const changeFilter = (filter) => {
        let url = 'http://127.0.0.1:5001/events';
        
        if (filter==="Date"){ url = 'http://127.0.0.1:5001/eventssortByDate';}
        else if (filter==="Clubs"){ url = 'http://127.0.0.1:5001/eventssortByClubs';}
        else if (filter==="Categories"){ url = 'http://127.0.0.1:5001/eventssortByCategories';}
        else{ url = 'http://127.0.0.1:5001/events';}
        return url;
      };
      const res = await fetch(changeFilter(filter));
      // console.log(changeFilter(filter));
      const data = await res.json();
        setItems(data);
    };
    getevents();
  },[filter]);
  console.log(tagName);
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
                <FormControl sx={{ m: 2, width: 200, marginLeft: '800px' }} size="small">
                  <InputLabel id="multiple-checkbox-label">Categories</InputLabel>
                  <Select disabled={filter!=="Categories" ? true : false}
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


            </Container>
            
      </Box>
      
      <Container sx={{ py: 4 }} maxWidth="md">
          <Grid container spacing={5}>
            {items && items.filter(item=>item.eventStartTime>=dateFormat(now, "isoDateTime")).map((item) => (
              <Grid item key={item} xs={12} sm={6} md={4}>
                <EventCard key={item._id} cName={item.clubName} eName={item.eventName} eDate={item.eventDate} eJoin={item.eventJoin} eImage={item.eventImage} eStartTime={item.eventStartTime} eEndTime={item.eventEndTime} eLoc={item.eventLoc} eTag={item.eventTags}/>
              </Grid>
            ))}
          </Grid>
        </Container>
   </div>   
  );
}  


export default Events;
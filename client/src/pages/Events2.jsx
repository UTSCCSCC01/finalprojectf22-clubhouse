import React from "react";
import EventCard from "./StudentEventCard.jsx";
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

/**
 * Fetch data from the database, depending on the chosen sorting filter. Retrieve only future events by sorting their dates. 
 * @component
 */
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

  const [tags, setTags ] = useState([]);
  const [tagName, setTagName] = React.useState([]);

  /**
   * Set multiselect component values. 
   * @param {string} event 
   */
  const handleChangeTag = (event) => {
    const {
      target: { value },
    } = event;
    setTagName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };
    const [filter, setFilter] = React.useState('');

    /**
     * Set select component value. 
     * @param {string} event 
     */
    const handleChange = (event) => {
      setFilter(event.target.value); 
    };

  const [items, setItems ] = useState([]);
  const now = new Date();
  const TagMapped = [];
  for (var key in tags){
    for (var key2 in tags[key]){
        if (key2==="eventTags"){
          for (var tagKey in tags[key][key2]){
            TagMapped.push(tags[key][key2][tagKey]);
          }}}}


  let contains = false;
  const conTains = (arrayTag) => {
    contains = false;
    arrayTag.forEach((itemArray) => {
      tagName.forEach((checkedTag) => {
        if ((itemArray.eventTags).includes(checkedTag)){
          contains = true;
          // console.log(contains);
          return contains;
        }
        else{contains=false;}
      })
    })
    return contains;
};

  /**
   * Fetch and set data from the database
   * every time the value of filter changes. 
   */
  useEffect(() => {
    const getevents = async ()=>{
      
      /**
       * Set url depending on the selected sorting type
       * @param {string} filter 
       */
      const changeFilter = (filter) => {
        let url = 'http://127.0.0.1:5001/events';
        if (filter==="Date"){ url = 'http://127.0.0.1:5001/eventssortByDate';}
        else if (filter==="Clubs"){ url = 'http://127.0.0.1:5001/eventssortByClubs';}
        else if (filter==="Categories"){ url = 'http://127.0.0.1:5001/eventssortByCategories';}
        else{ url = 'http://127.0.0.1:5001/events';}
        return url;
      };
      const res = await fetch(changeFilter(filter));
      const data = await res.json();
      setItems(data);  
    };
    getevents();
  },[filter, tagName, conTains(items)]);

  useEffect(() => {
    const gettags = async ()=>{
      /**
       * Fetch event tags from the database and set them to multiselect component
       */
      const resTags = await fetch('http://127.0.0.1:5001/tags');
      const dataTags = await resTags.json();
      setTags(dataTags);  
    };
    gettags();
  },[]);



// console.log(contains);




  if (filter==="Categories"){
    return (
      <div>
        <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 6}}>         
            <Container maxWidth="lg" >
              <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>  Upcoming Events</Typography>
              <FormControl sx ={{ minWidth: 120, marginLeft: '1000px'}} variant="outlined" size="small">
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
                  <FormControl sx={{ m: 2, width: 150, marginLeft: '980px' }} size="small">
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
                      {TagMapped.map((tag) => (
                        <MenuItem key={tag} value={tag}>
                          <Checkbox checked={tagName.indexOf(tag) > -1} />
                          <ListItemText primary={tag} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
              </Container>     
        </Box>
        <Container sx={{ py: 4, px: 4}} maxWidth="lg">
            <Grid container spacing={3}>
              {console.log(conTains(items))}
              {/* {items.forEach((item) => {
                if (conTains(tagName)){
                  item.map((item) => {
                    <Grid item key={item} xs={12} sm={6} md={4}>
                  <EventCard key={item._id} cName={item.clubName} eName={item.eventName} eDate={item.eventDate} eJoin={item.eventJoin} eImage={item.eventImage} eStartTime={item.eventStartTime} eEndTime={item.eventEndTime} eLoc={item.eventLoc} eTags={item.eventTags} eDesc={item.eventDesc}/>
                  </Grid>
                  })
                }
              })} */}
              {items && conTains(items) && items.filter(item=>item.eventStartTime>=dateFormat(now, "isoDateTime")).map((item) => (
                <Grid item key={item} xs={12} sm={6} md={4}>
                  <EventCard key={item._id} cName={item.clubName} eName={item.eventName} eDate={item.eventDate} eJoin={item.eventJoin} eImage={item.eventImage} eStartTime={item.eventStartTime} eEndTime={item.eventEndTime} eLoc={item.eventLoc} eTags={item.eventTags} eDesc={item.eventDesc}/>
                </Grid>
              ))}
            </Grid>
          </Container>
     </div>   
    );
  }
  else {
    return (
      <div>
        <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 6}}>         
            <Container maxWidth="lg" >
              <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>  Upcoming Events</Typography>
              
              <FormControl sx ={{ minWidth: 120, marginLeft: '1000px'}} variant="outlined" size="small">
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
                  <FormControl sx={{ m: 2, width: 150, marginLeft: '980px' }} size="small">
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
                      {TagMapped.map((tag) => (
                        <MenuItem key={tag} value={tag}>
                          <Checkbox checked={tagName.indexOf(tag) > -1} />
                          <ListItemText primary={tag} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
              </Container>        
        </Box>
        <Container sx={{ py: 4, px: 4}} maxWidth="lg">
            <Grid container spacing={3}>
              {items && items.filter(item=>item.eventStartTime>=dateFormat(now, "isoDateTime")).map((item) => (
                <Grid item key={item} xs={12} sm={6} md={4}>
                  <EventCard key={item._id} cName={item.clubName} eName={item.eventName} eDate={item.eventDate} eJoin={item.eventJoin} eImage={item.eventImage} eStartTime={item.eventStartTime} eEndTime={item.eventEndTime} eLoc={item.eventLoc} eTags={item.eventTags} eDesc={item.eventDesc}/>
                </Grid>
              ))}
            </Grid>
          </Container>
     </div>   
    );
  }
}  


export default Events;
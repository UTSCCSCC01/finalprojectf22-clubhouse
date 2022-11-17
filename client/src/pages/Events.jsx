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
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Auth from "../components/AuthCheck.jsx";

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
  const [search, setSearch ] = useState("");

  let containsS = false;
  /**
   * Check whether arrayTag includes any of clubTags
   * @param {array} arrayTag 
   */
const conTainsS = (arrayTag) => {
  containsS = false;
  arrayTag.eventTags.forEach((clubTAG) => {
    if(clubTAG.toLowerCase().includes(search)){
      containsS = true;
      return containsS;
    }
  })
  return containsS;
};

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
  /**
   * Check whether arrayTag includes any of checkedTags
   * @param {array} arrayTag 
   */
  const conTains = (arrayTag) => {
      contains = false;
      tagName.forEach((checkedTag) => {
          if ((arrayTag.eventTags).includes(checkedTag)){
              contains = true;
              return contains; 
          }
      })
      return contains;
};

  /**
   * Fetch and set data from the database
   * every time the value of filter changes. 
   */
  useEffect(() => {
    Auth({"admin": "/SCSUClubs", "club": "/clubMain"});
    const getevents = async ()=>{
      /**
       * Set url depending on the selected sorting type
       * @param {string} filter 
       */
      const changeFilter = (filter) => {
        let url = 'http://127.0.0.1:5001/events';
        if (filter==="Date"){ url = 'http://127.0.0.1:5001/eventssortByDate';}
        else if (filter==="Clubs"){ url = 'http://127.0.0.1:5001/eventssortByClubs';}
        else if (filter==="Categories" && Object.keys(tagName).length>=1){ url = 'http://127.0.0.1:5001/eventssortByCategories';}
        else{ url = 'http://127.0.0.1:5001/events';}
        return url;
      };
      const res = await fetch(changeFilter(filter));
      const data = await res.json();
      setItems(data); 
      
    };
    getevents();
  },[filter]);

  /**
   * Fetch and set tags from the database
   */
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

  return (
    <div>
        <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 2 }}>         
            <Container maxWidth="lg" fixed>
              <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>  Upcoming Events</Typography>
              <Grid maxWidth="lg" align="center"> 
                  <TextField
                  sx={{ m: 1, width: 350}}
                      id="outlined-start-adornment"
                      variant="outlined"
                      label="Search"
                      size="small"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      InputProps={{
                        endAdornment: <InputAdornment position="start"><SearchIcon></SearchIcon></InputAdornment>,
                    }}
                  ></TextField>
                  <FormControl sx ={{ m: 1, width: 150}} variant="outlined" size="small">
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
                  <FormControl sx={{ m: 1, width: 150 }} size="small">
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
               </Grid>
              </Container>     
        </Box>
        
        <Container maxWidth="lg" >
            <Grid container spacing={2} >
            {items && items.filter(item=>item.eventStartTime>=dateFormat(now, "isoDateTime")).map((item) => {
              if ( (search==="" && Object.keys(tagName).length == 0) || (filter=="Categories" && conTains(item)) || (search!=="" && conTainsS(item)) || (conTainsS(item) && !conTainsS(item)) ){
                return (<Grid item key={item}>
                  <EventCard key={item._id} eKey = {item._id} cName={item.clubName} eName={item.eventName} eDate={item.eventDate} eJoin={item.eventJoin} eImage={item.eventImage} eStartTime={item.eventStartTime} eEndTime={item.eventEndTime} eLoc={item.eventLoc} eTags={item.eventTags} eDesc={item.eventDesc}/>
                 </Grid>)
              }
              else{ 
                return (<Grid item key={item} sx={{width: 0}} ></Grid>)
              }
                    })}
           
            </Grid>
          </Container>
          
     </div>
  );
}
export default Events;
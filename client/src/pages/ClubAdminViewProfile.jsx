import React from "react";
import MultiActionAreaCard from "./EventCard.jsx";
import EventCard from "./EventCard.jsx";
import { useEffect, useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import { IconButton, Box, CardMedia, Typography,Card, CardContent, Stack, Container, Grid } from '@mui/material/'
import EditIcon from '@mui/icons-material/Edit';
import { getCookie } from '../libraries/cookieDAO'
import dateFormat from 'dateformat';

/**
 * ClubAdminViewProfile
 * @component
 */
function ClubAdminViewProfile(props) {
  const url = 'http://127.0.0.1:5001/club/events';

  const clubName = getCookie("clubName");
  // console.log(props.values);
  const [isMore, setisMore] = useState(true);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(2);
  const now = new Date();

  /**
* <Gets page 1 of events from the database>
*/


  useEffect(() => {
    const getevents = async () => {

      const res = await fetch(url + "?page=1" + "&clubName=" + clubName);

      const data = await res.json();
      setItems(data);
    };

    getevents();
  }, []);


  /**
 * <function description>

 * @returns  {Promise<Object>}        <returns the events depending on the page number from the database>
 */
  const fetchData = async () => {

    const res = await fetch(url + '?page=' + page + "&clubName=" + clubName);

    const data = await res.json();

    return data;
  };
  /**
   * < increments the page number by 1 and if there are no events left it sets the variable isMore to false>
   * 
   */
  const fetchd = async () => {
    const eventfromserv = await fetchData();

    setItems([...items, ...eventfromserv]);
    if (eventfromserv.length === 0 || eventfromserv.length < 1) {
      setisMore(false);
    }

    setPage(page + 1);
  }
  const [image, setImage] = useState('https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Utoronto_coa.svg/1200px-Utoronto_coa.svg.png');

  /**
* <fetches the image base64 string and sets image to that>
* 
*/
  useEffect(() => {
    const fetchImage = async () => {
      const res = await fetch("http://127.0.0.1:5001/club/profileimg/" + clubName);
      const data = await res.json();

      setImage(data);


    }
    fetchImage();
  });

  return (

    <Stack mt="120px" mb="60px" ml="auto" mr="auto" alignItems="center" width="80%" minWidth="700px" maxWidth="1115px">
      <Card sx={{ mb: "40px", width: "100%" }} raised>
        <CardMedia
          component="img"
          sx={{width: "100%", maxWidth: "100%", maxHeight: 250, objectFit: "contain"}}
          image={image} alt="profile-picture" />

        <CardContent sx={{padding: "32px"}}>
          <Box display="flex" justifyContent="space-between">
            <Typography flexWrap="wrap" gutterBottom variant="h3">{props.values.clubName}</Typography>
            <Box width="20%" flex={0}>
              <IconButton size="large" onClick={props.onClick}><EditIcon /></IconButton>
            </Box>
          </Box>
          
          <Typography gutterBottom variant="h6">Contact Info</Typography>
          <Typography>Email: {props.values.email}</Typography>
          <Typography gutterBottom>Phone: {props.values.clubPhone ? props.values.clubPhone : "N\\A"}</Typography>

          <Typography gutterBottom variant="h6">Description</Typography>
          <Typography>{props.values.clubDesc}</Typography>
        </CardContent>
      </Card>

      <Box sx={{mt: "24px", width: "100%"}}>
        <Typography alignSelf="left" variant="h4" mb="24px">My Upcoming Events</Typography>
        <Grid spacing={4} container>
          {items && items.filter(item => item.eventStartTime >= dateFormat(now, "isoDateTime")).map((item) => {
              return (<Grid item key={item}>
                <EventCard key={item._id} eKey={item._id} cName={item.clubName} eName={item.eventName} eDate={item.eventDate} eJoin={item.eventJoin} eImage={item.eventImage} eStartTime={item.eventStartTime} eEndTime={item.eventEndTime} eLoc={item.eventLoc} eTags={item.eventTags} eDesc={item.eventDesc} />
              </Grid>)
            }
          )}

        </Grid>
      </Box>

    </Stack>

  );
}


export default ClubAdminViewProfile;

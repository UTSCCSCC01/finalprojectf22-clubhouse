import React from "react";
import EventCard from "./EventCard.jsx";
import { useEffect,useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import Fab from '@mui/material/Fab'
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Skeleton } from "@mui/material";
import { IconButton, Box, CardMedia, Typography, Card, CardContent, Stack, Paper, Grid } from '@mui/material/'
import dateFormat from 'dateformat';

/**
 * StudentClubProfile
 * @component
 */
function StudentClubProfile(props) {
  const url = 'http://127.0.0.1:5001/club/events';

  const [isMore, setisMore] = useState(true);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(2);
  const [clubName, setClubName] = useState(props.clubName);
  const [noitem, setNoitem] = useState(false);
  /**
* <Gets page 1 of events from the database>
*/
  useEffect(() => {
    const getevents = async () => {
      const res = await fetch(url + "?page=1" + "&clubName=" + clubName);
      const data = await res.json();
      setItems(data);
      if (data.length <= 0) {
        setisMore(false);
        setNoitem(true)
      }
    };

    getevents();
  }, []);


  /**
 * <function description>

 * @returns  {Promise<Object>}        <returns the events depending on the page number from the database>
 */
  const fetchData = async () => {
    const res = await fetch(url + '?page=' + page + "&clname=" + clubName);
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
  const [image, setImage] = useState('');

  /**
* <fetches the image base64 string and sets image to that>
* 
*/
  useEffect(() => {
    const fetchImage = async () => {
      const res = await fetch("http://127.0.0.1:5001/club/profileimg");
      const data = await res.json();

      setImage(data);


    }
    fetchImage();
  });

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "start" }}>
      <IconButton aria-label="edit"
        sx={{ m: "60px 40px auto 20px" }}
        type="submit"
        size="large"
        onClick={props.close}>
        <ArrowBackIcon />
      </IconButton>
      <Stack mt="60px" mb="60px" width="100%" minWidth="700px" maxWidth="1000px">
        <Card sx={{ display: "flex", ml: "0", mb: "40px", width: "100%" }}>
          <CardMedia
            component="img"
            sx={{ maxWidth: 250, objectFit: "contain" }}
            image={props.img} alt="profile-picture" />

          <CardContent sx={{ flexGrow: 1, width: "100%", padding: "32px" }}>
            <Typography flexWrap="wrap" gutterBottom variant="h4">{props.clubName}</Typography>

            <Typography gutterBottom variant="h6">Contact Info</Typography>
            <Typography>Email: {props.email}</Typography>
            <Typography gutterBottom>Phone: {props.phoneNumber ? props.phoneNumber : "N\\A"}</Typography>

            <Typography gutterBottom variant="h6">Description</Typography>
            <Typography>{props.description}</Typography>
          </CardContent>
        </Card>


        <Paper elevation={2} sx={{ width: "100%" }}>
          <Typography sx={{ m: "24px", }} alignSelf="left" variant="h4" mb="24px">Upcoming Events</Typography>

          <div style={{ width: "100%" }} id="scrollableDiv" className="evenCard">

            <InfiniteScroll
              style={{ height: "600px" }}
              dataLength={items.length} //This is important field to render the next data
              next={fetchd}
              hasMore={isMore}
              scrollableTarget="scrollableDiv"
              loader={
                <Typography width="92%"
                  textAlign="center"
                  variant="h5"
                  color="gray"
                  sx={{ backgroundColor: "#eeeeee", ml: 2, mr: 3, p: 2, borderRadius: "8px" }}
                >Loading...</Typography>}
              endMessage={
                noitem ? (
                  <Typography width="92%"
                    textAlign="center"
                    variant="h5"
                    color="gray"
                    sx={{ backgroundColor: "#eeeeee", ml: "auto", mr: "auto", p: 2, borderRadius: "6px" }}
                  >No upcoming events!</Typography>
                  // <div>
                  //   <Stack spacing={1}>
                  //     {/* For variant="text", adjust the height via font-size */}
                  //     <Skeleton variant="text" sx={{ fontSize: '1rem' }} />

                  //     {/* For other variants, adjust the size with `width` and `height` */}
                  //     <Skeleton sx={{ bgcolor: '#7ba4d9' }} variant="rounded" width="100%" height={200} />
                  //     <Skeleton sx={{ bgcolor: '#7ba4d9' }} variant="rounded" width="100%" height={60} />
                  //     <Skeleton sx={{ bgcolor: '#7ba4d9' }} variant="rounded" width="100%" height={60} />
                  //   </Stack>
                  // </div>
                ) :
                  <Typography width="92%"
                    textAlign="center"
                    variant="h5"
                    color="gray"
                    sx={{ backgroundColor: "#eeeeee", ml: 2, mr: 3, p: 2, borderRadius: "8px" }}
                  >No more events!</Typography>
              }>
              {items && items.filter(item => item.eventStartTime >= dateFormat(new Date(), "isoDateTime")).map((item) => {
                return (
                  <EventCard key={item._id} eKey={item._id} cName={item.clubName} eName={item.eventName} eDate={item.eventDate} eJoin={item.eventJoin} eImage={item.eventImage} eStartTime={item.eventStartTime} eEndTime={item.eventEndTime} eLoc={item.eventLoc} eTags={item.eventTags} eDesc={item.eventDesc} />
                )
              })}
            </InfiniteScroll>
          </div>
        </Paper>

      </Stack>
    </Box>


  );
}


export default StudentClubProfile;

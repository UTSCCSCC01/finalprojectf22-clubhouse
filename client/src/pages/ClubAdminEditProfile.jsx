import React from "react";
import TextField from '@mui/material/TextField';
import EventCard from "./EventCard.jsx";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useEffect, useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import { getCookie } from '../libraries/cookieDAO'
import { IconButton, Box, CardMedia, Typography, Card, CardContent, Stack, Button, Container, Grid, Icon } from '@mui/material/'
import EditIcon from '@mui/icons-material/Edit';
import dateFormat from 'dateformat';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import DoneIcon from '@mui/icons-material/Done';
/**
 * ClubAdminEditProfile
 * @component
 */
function ClubAdminEditProfile(props) {
  const url = 'http://127.0.0.1:5001/club/events';

  const clubName = getCookie("clubName");
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

  const style = {
    input: {
      color: "white",
    },
    "& .MuiInputLabel-root": { color: 'white' },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
      '&:hover fieldset': {
        borderColor: 'lightBlue',
      },
      "& fieldset": { borderColor: "white" }
    },
    '& label.Mui-focused': {
      color: 'lightBlue',
    }
  }
  /**
 * function description
 * @returns  {Promise<Object>}        returns the events depending on the page number from the database
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
 * <gets the image field from the database for the clubs profile sets image to the data url>
      
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

  /**
   * <trigger for when image upload is unsuccesful. Sets Open to true>  
   */
  const handleClick = () => {
    setOpen(true);
  };

  /**
   * <sets Open to false when someone closes the alert>
  
   */
  const handleClose = () => {
    setOpen(false);
  };

  /**
 * <gets the base64 string for the image and updates it in the database.>
 * @param   {Object} input <The uploaded image>
 
 */
  const imagechange = (input) => {

    let file = input.target.files[0];

    let reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = function () {

      var lins = reader.result.toString();
      setImage(lins);
      console.log(lins);

      fetch('http://127.0.0.1:5001/club/picupdate/' + clubName, {
        method: 'PATCH', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'image': lins }),
      })
        .then((response) => response.json())
        .then((data) => {

        })
        .catch((error) => {
          handleClick();

          console.error('Error:', error);
        });
    };
    reader.onerror = function () {
      console.log(reader.error);
    };
  }
  const [open, setOpen] = useState(false);

  const onSave = () => {
    props.editDone(props.values._id);

  };

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (

    <Stack mt="120px" mb="60px" ml="auto" mr="auto" alignItems="center" width="80%" minWidth="700px" maxWidth="1115px">
      <Card sx={{ mb: "40px", width: "100%" }} raised>
        <ImageList sx={{ mt: 0 }} cols={1}>
          <ImageListItem key="club profile pic" height="250px">
            <img
              src={image}
              style={{ width: "auto", maxWidth: "100%", maxHeight: 250, objectFit: "contain" }}
              alt="profile-picture">
            </img>
            <ImageListItemBar
              title="Update Club Photo"
              actionIcon={
                <IconButton aria-label="upload club photo" component="label">
                  <input onChange={imagechange} hidden accept="image/*" type="file" />
                  <PhotoCamera sx={{ m: 1 }} />
                </IconButton>
              } />
          </ImageListItem>
        </ImageList>

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Image Upload Unsuccesful:
            Choose another Image!
          </Alert>
        </Snackbar>

        <CardContent sx={{ padding: "32px" }}>
          <Box display="flex" justifyContent="space-between">
            <Typography flexWrap="wrap" gutterBottom variant="h3">{props.values.clubName}</Typography>
          </Box>

          <Typography gutterBottom variant="h6">Contact Info</Typography>
          <Typography>Email: {props.values.email}</Typography>
          <Typography gutterBottom>Phone: {props.values.clubPhone ? props.values.clubPhone : "N\\A"}</Typography>

          <Typography mb="12px" variant="h6">Description</Typography>
          <TextField
            variant="outlined"
            minRows={6}
            name="clubDesc"
            value={props.values.clubDesc}
            onChange={props.onChange}
            fullWidth
            multiline
          ></TextField>

          <Box sx={{display: "flex", justifyContent: "flex-end", mt: 2}}>
            <Button
              size="large"
              type="submit"
              onClick={onSave}
              endIcon={<DoneIcon />}
            >Save
            </Button>
          </Box>

        </CardContent>
      </Card>

      <Box sx={{ mt: "24px", width: "100%" }}>
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

    </Stack >

  );
}

export default ClubAdminEditProfile;

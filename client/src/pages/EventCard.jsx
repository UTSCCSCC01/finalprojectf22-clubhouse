import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import dateFormat from 'dateformat';
import EventIcon from '@mui/icons-material/Event';
import TimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { CardActions, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import EventTag from "./EventTag.jsx"
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { getCookie } from '../libraries/cookieDAO'
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import PropTypes from 'prop-types';

/**
 * Display fetched information in a card
 * Reformat eventStartTime and eventEndTime. 
 * @param {*} props 
 * @component
 */
export default function EventCard(props) {

  const user = getCookie("username");
  const accountType = getCookie("accountType");
  const [OnOff, setOnOff] = useState(false);
  const [open, setOpen] = useState(false);

  if (accountType === "student") {
    /**
     * set OnOff every time eAttendees changes
     */
    useEffect(() => {
      setOnOff(props.eAttendees.includes(user));
    }, [props.eAttendees])
  }

  /**
  * Remove or add a user to the eventAttendees list
  */
  const handleClickOpen = () => {
    setOpen(!open);
    setOnOff(!OnOff);
    if (user !== undefined) {
      if (OnOff) {
        fetch('http://127.0.0.1:5001/events/remove/' + props.eKey, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 'eventAttendees': user }),
        })
          .then(() => {
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
      else {
        fetch('http://127.0.0.1:5001/events/add/' + props.eKey, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 'eventAttendees': user }),
        })
          .then(() => {
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
    }
    else {
      setError(true);
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  function handleClick() {
    setOnOff(!OnOff);
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card raised sx={{ m: "8px auto 24px auto", width: "95%", display: "flex" }} >
      <CardMedia
        component="img"
        sx={{ width: "250px" }}
        image={props.eImage} alt="event image" />
      <CardContent sx={{ m: "2 auto 2 2" }}>
        <Typography gutterBottom variant="h5" component="h2">{props.eName}</Typography>
        <Typography><EventIcon fontSize="inherit" ></EventIcon>  {dateFormat(props.eStartTime, "mmmm dS, yyyy")} </Typography>
        <Typography><TimeIcon fontSize="inherit"></TimeIcon> {dateFormat(props.eStartTime, "shortTime")}</Typography>
        <Typography><LocationOnIcon fontSize="inherit"></LocationOnIcon> {props.eLoc} </Typography>
        <Typography sx={{ m: "20px 4px 0 4px" }} paragraph>{props.eDesc}</Typography>
        <Box display="inline-flex" flexWrap="wrap" mt="20px">
          {(props.eTags).map((tag) => (
            <EventTag data={tag} />
          ))}
        </Box>
      </CardContent>
      {accountType === "student" &&
        (<CardContent>
          <Button onClick={handleClickOpen} variant={OnOff ? "outlined" : "contained"}
            sx={{width: "96px", marginBottom: 1.5, marginLeft: 1.5 }}>{OnOff ? 'cancel' : 'sign up'}
          </Button>
        </CardContent>)}
    </Card>
  );
}

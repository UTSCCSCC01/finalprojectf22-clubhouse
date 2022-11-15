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
import { useState } from 'react';
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

  const [open, setOpen] = React.useState(false);

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
    <Card raised sx={{m: "8px auto 24px auto", width: "95%", display: "flex"}} >
      <CardMedia
        component="img"
        sx={{width: "250px"}}
        image={props.eImage} alt="event image" />
      <CardContent sx={{ m: 2, width: "100%" }}>
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
    </Card>
  );
}

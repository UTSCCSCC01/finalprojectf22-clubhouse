import * as React from 'react';
import { CardActions, Box, Button, Card, CardContent, Typography, Collapse, IconButton, DialogTitle, DialogContentText, DialogContent, DialogActions, Dialog} from '@mui/material';
import { useState } from 'react';
import EventTag from "./EventTag.jsx"
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

/**
 * Display fetched information in a card
 * @param {*} props 
 * @component
 */

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ClubRequestCard(props) {
    const [expanded, setExpanded] = React.useState(false);

    const clubName = props.clubName;
    const clubPhone = props.clubPhone;
    const clubEmail = props.clubEmail;
    const clubDesc = props.clubDesc;
    const image = "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Utoronto_coa.svg/1200px-Utoronto_coa.svg.png";
    const clubTags = props.clubTags;
    const newClub = { clubEmail, clubName, clubPhone, clubDesc, image, clubTags};
    console.log(newClub);

        
    
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [open, setOpen] = React.useState(false);
    const [openDeny, setOpenDeny] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClickOpenDeny = () => {
      setOpenDeny(true);
    };

    const handleClose = () => {
      setOpen(false);
      fetch('http://localhost:5001/clubs/create', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newClub)
        }).then(() => {

        }).catch((err) => {
            console.log(err);
        })
        navigate("/club-signup-confirmation");

    };

    const handleCloseDeny = () => {
      setOpenDeny(false);
    };

  return (
    <Card sx={{ width: 800 }} raised >
    <Box display="flex">
      <CardContent sx={{ flexGrow: 1, minWidth: 350 }}>
        <Typography gutterBottom variant="h7" component="h2">{props.cName} </Typography>  
      </CardContent>
     
      <CardActions>
         <Button variant="contained" size="small" onClick={handleClickOpen}>Approve</Button>
         <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"You would like to approve the registration request?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Let Google help apps determine location. This means sending anonymous
                location data to Google, even when no apps are running.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>Approve and send an approval email</Button>
            </DialogActions>
          </Dialog>
         <Button variant="contained" size="small" onClick={handleClickOpenDeny}>Deny</Button>
         <Dialog
            open={openDeny}
            onClose={handleCloseDeny}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"You would like to approve the registration request?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Let Google help apps determine location. This means sending anonymous
                location data to Google, even when no apps are running.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDeny} autoFocus>Deny the request email</Button>
            </DialogActions>
          </Dialog>
       </CardActions>
    </Box>
    
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="more info"
        >
        <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent> 
          <Typography >Email address: {props.cEmail}</Typography>
          <Typography >Phone number: {props.cPhone}</Typography>
          <Typography >Club description: {props.cDesc}</Typography>
          <Box display="inline-flex" flexWrap="wrap" mt="20px"> 
            {(props.cTags).map((tag) => (
              <EventTag data={tag}/> 
            ))}
          </Box>
        </CardContent>
      </Collapse>

    </Card>
  );
}

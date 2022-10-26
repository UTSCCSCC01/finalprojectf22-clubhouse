import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useState } from 'react';

import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Check,  Clear} from '@mui/icons-material';
import { IconButton, CardActionArea, Grid,Dialog, DialogTitle,DialogContent,DialogContentText, Button, DialogActions } from '@mui/material';



export default function PotentialMemCard(props) {
  const [open, setOpen] = useState(false);
  const [confirmYes, setConfirmYes] = useState(false);
  const [confirmNo, setConfirmNo] = useState(false);
  
  const handleClickMember = () => {
    setOpen(true);
  };
  const handleCloseMember = () => {
    setOpen(false);
  };

  const handleConfirmYesOpen = () => {
    setConfirmYes(true);
  };
  const handleConfirmYesClose = () => {
    setConfirmYes(false);
  };

  const handleConfirmNoOpen = () => {
    setConfirmNo(true);
  };
  const handleConfirmNoClose = () => {
    setConfirmNo(false);
  };
  
  const handleDenyClick = () => {
    
    props.onDeny(props.member._id);
    setConfirmNo(false);
  };
  
  const handleAcceptClick = () => {
    props.onAccept(props.member._id);
    
  };
  // console.log(props.member._id);
const bool = props.visible;
  return (
    <Card sx={{ width:'400'}} >
      <Grid container>
        <Grid item>
      <CardActionArea sx={{ width:'300'}} onClick={handleClickMember}>
      <CardContent>
        
        
        <Typography variant="h7" component="div" noWrap={true}>
         {props.member.userName}
        </Typography>
      
        
      </CardContent>
      </CardActionArea>
      <Dialog  open={open} keepMounted onClose={handleCloseMember}>
            <DialogTitle >{props.member.userName}</DialogTitle>
               <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                  {props.member.email}
                    </DialogContentText>
                 </DialogContent>
        
        </Dialog>

        <Dialog  open={confirmYes} keepMounted onClose={handleConfirmYesClose}>
            <DialogTitle >Are you sure you want to accept this user to the club?</DialogTitle>
               <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                  You cannot undo this action
                    </DialogContentText>
                    <DialogActions>
                      <Button autoFocus onClick={handleAcceptClick}>
                        Yes
                      </Button>
                      <Button autoFocus onClick={handleConfirmYesClose}>
                        No
                      </Button>
        </DialogActions>
                 </DialogContent>
        
        </Dialog>

        <Dialog  open={confirmNo} keepMounted onClose={handleConfirmNoClose}>
            <DialogTitle >{props.message}</DialogTitle>
               <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                  You cannot undo this action
                    </DialogContentText>
                    <DialogActions>
                      <Button autoFocus onClick={handleDenyClick}>
                        Yes
                      </Button>
                      <Button autoFocus onClick={handleConfirmNoClose}>
                        No
                      </Button>
        </DialogActions>
                 </DialogContent>
        
        </Dialog>
      </Grid>
      <Grid item>
      <IconButton aria-label="accept request" color='success' onClick={handleConfirmYesOpen} sx={{visibility: bool==true ? "" : "hidden"}}>
          <Check />
        </IconButton>
        <IconButton aria-label="deny request" color='warning' onClick={handleConfirmNoOpen}>
          <Clear />
        </IconButton>
        </Grid>
        </Grid>
      

    </Card>
  );
}

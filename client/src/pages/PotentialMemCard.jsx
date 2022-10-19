import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useState } from 'react';

import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Check,  Clear} from '@mui/icons-material';
import { IconButton, CardActionArea, Grid,Dialog, DialogTitle,DialogContent,DialogContentText } from '@mui/material';



export default function PotentialMemCard(props) {
  const [open, setOpen] = useState(false);
  const handleClickMember = () => {
    setOpen(true);
  };
  const handleCloseMember = () => {
    setOpen(false);
  };

  const handleDenyClick = () => {
    
    props.onDeny(props.member._id);
  };
  
  const handleAcceptClick = () => {
    props.onAccept(props.member._id);
  };
  // console.log(props.member._id);

  return (
    <Card sx={{ width:'400'}} >
      <Grid container>
        <Grid item>
      <CardActionArea sx={{ width:'300'}} onClick={handleClickMember}>
      <CardContent>
        
        
        <Typography variant="h7" component="div" noWrap={true}>
         {props.member.clubEmail}
        </Typography>
      
        
      </CardContent>
      </CardActionArea>
      <Dialog  open={open} keepMounted onClose={handleCloseMember}>
            <DialogTitle >{props.name}</DialogTitle>
               <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                     Temp info. will go here from the daata base.
                    </DialogContentText>
                 </DialogContent>
        
        </Dialog>
      </Grid>
      <Grid item>
      <IconButton aria-label="accept request" color='success' onClick={handleAcceptClick}>
          <Check />
        </IconButton>
        <IconButton aria-label="deny request" color='warning' onClick={handleDenyClick}>
          <Clear />
        </IconButton>
        </Grid>
        </Grid>
      

    </Card>
  );
}

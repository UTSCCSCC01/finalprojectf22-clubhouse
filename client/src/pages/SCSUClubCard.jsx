import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, listClasses } from '@mui/material';
import { IconButton, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, Button, DialogActions } from '@mui/material';
import { useState } from 'react';
import StudentClubProfile from './StudentClubProfile.jsx';
import '../styles.css';

/**
 * Component for club card format.
 * @component
 * @example
 * return scsuclubs.map((club, index) => (
    <SCSUClubCard key={index} cKey={club._id} eImage={club.image} cName={club.clubName} cPhone={club.clubPhone} cEmail={club.email}></SCSUClubCard>      ));
 */

function SCSUClubCard(props) {

  const [open, setOpen] = useState(false);
  const [confirmYes, setConfirmYes] = useState(false);

  const handleConfirmYesOpen = () => {
    setConfirmYes(true);
  };
  const handleConfirmYesClose = () => {
    setConfirmYes(false);
  };

  const handleDelete = () => {
    fetch('http://localhost:5001/clubs/del/' + props.cKey, { method: 'DELETE' }).then(() => {
    }).catch((err) => {
      console.log(err);
    });
    fetch('http://localhost:5001/users/del/' + props.cName, { method: 'DELETE' }).then(() => {
    }).catch((err) => {
      console.log(err);
    });
    fetch('http://localhost:5001/club-members/del/' + props.cName, { method: 'DELETE' }).then(() => {
    }).catch((err) => {
      console.log(err);
    });
    fetch('http://localhost:5001/positions/del/' + props.cName, { method: 'DELETE' }).then(() => {
    }).catch((err) => {
      console.log(err);
    });
    fetch('http://localhost:5001/events/' + props.cName, { method: 'DELETE' }).then(() => {
    }).catch((err) => {
      console.log(err);
    });
    // refreshPage();
    props.updateList(props.list.filter((club) => club._id !== props.cKey));
  };

  /**
* Set open to false
*/
  const handleClose = () => {
    setOpen(false);
  };
  /**
 * toggle open  
 */
  const handleToggle = () => {
    setOpen(!open);
  };

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <Card sx={{ width: 350, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: "space-between" }} raised>
      <Dialog fullScreen open={open} onClose={handleClose}>
        <StudentClubProfile close={handleClose} img={props.cImage} phoneNumber={props.cPhone} clubName={props.cName} email={props.cEmail} description={props.cDesc}  ></StudentClubProfile>
      </Dialog>
      <CardActionArea onClick={handleToggle}>
        <CardMedia
          component="img"
          height="250"
          image={props.cImage} alt="Clubs" />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h7" component="h2">{props.cName} </Typography>
          <Typography >{props.cPhone} </Typography>
          <Typography >{props.cEmail} </Typography>
        </CardContent>
      </CardActionArea>

      <Dialog open={confirmYes} keepMounted onClose={handleConfirmYesClose}>
        <DialogTitle >Are you sure you want to delete {props.cName}? You cannot undo this action.</DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-slide-description">
                You cannot undo this action
              </DialogContentText> */}
          <DialogActions>
            <Button autoFocus onClick={handleDelete}>
              Yes
            </Button>
            <Button autoFocus onClick={handleConfirmYesClose}>
              No
            </Button>
          </DialogActions>
        </DialogContent>

      </Dialog>

      <CardActions>
        <Button sx={{ m: 1 }} onClick={handleConfirmYesOpen} color="error" variant="contained" size="large">Delete Club</Button>
      </CardActions>
    </Card>
  );
}

export default SCSUClubCard;
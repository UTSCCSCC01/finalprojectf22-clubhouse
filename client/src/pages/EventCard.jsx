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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

/**
 * Display fetched information in a card
 * Reformat eventStartTime and eventEndTime. 
 * @param {*} props 
 * @component
 */
export default function EventCard(props) {

  const [expanded, setExpanded] = React.useState(false);
  const [OnOff, setOnOff] = useState(false);
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
    <Card raised sx={{ width: 350 }} >
      <CardMedia
        component="img"
        height="250"
        image={props.eImage} alt="event image" />
      <CardContent sx={{ width: 370 }}>
        <Typography gutterBottom variant="h5" component="h2">{props.eName}</Typography>
        <Typography><EventIcon fontSize="inherit" ></EventIcon>  {dateFormat(props.eStartTime, "mmmm dS, yyyy")} </Typography>
        <Typography><TimeIcon fontSize="inherit"></TimeIcon> {dateFormat(props.eStartTime, "shortTime")}</Typography>
        <Typography>  <LocationOnIcon fontSize="inherit"></LocationOnIcon> {props.eLoc} </Typography>

      </CardContent>

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
          <Typography sx={{m: "0 4px 0 4px"}} paragraph>{props.eDesc}</Typography>

          <Box display="inline-flex" flexWrap="wrap" mt="20px">
            {(props.eTags).map((tag) => (
              <EventTag data={tag} />
            ))}
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
}

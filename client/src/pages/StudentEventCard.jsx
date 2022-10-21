import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import dateFormat from 'dateformat';
import EventIcon from '@mui/icons-material/Event';
import TimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { CardActions, Box} from '@mui/material';
import { useState } from 'react';
import EventTag from "./EventTag.jsx"
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

/**
 * Display fetched information in a card
 * Reformat eventStartTime and eventEndTime. 
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

export default function StudentEventCard(props) {

    const [cName, setCname] = useState('');
    const [eDate, setEdate] = useState('');
    const [eName, setEname] = useState('');
    const [eTags, setEtags] = useState('');
    const [eDesc, setEdesc] = useState('');
    const [expanded, setExpanded] = React.useState(false);
    const [OnOff, setOnOff] = useState(false);

  function handleClick() {
    setOnOff(!OnOff);
  }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

  return (
    <Card sx={{ maxWidth: 345 }} >
      <CardMedia
                component="img"
                height="250"
                image={props.eImage} alt="UTSC"/>
      <CardContent sx={{ flexGrow: 1, minWidth: 350 }}>
                <Typography gutterBottom variant="h7" component="h2">{props.eName} by {props.cName} </Typography>  
                <Typography><EventIcon fontSize="inherit" ></EventIcon>  {dateFormat(props.eStartTime, "mmmm dS, yyyy")} </Typography>
                <Typography><TimeIcon fontSize="inherit"></TimeIcon> {dateFormat(props.eStartTime, "shortTime")} - {dateFormat(props.eEndTime, "shortTime")}</Typography>
                <Typography>  <LocationOnIcon fontSize="inherit"></LocationOnIcon> {props.eLoc} </Typography>    
                <Box display="inline-flex" flexWrap="wrap" mt="20px"> 
                    {(props.eTags).map((tag) => (
                        <EventTag data={tag}/> 
                    ))}
                </Box>
            </CardContent>

      <CardActions disableSpacing>
        {/* <IconButton aria-label="RSVP" onClick={handleClick} 
        // href={props.eJoin}
        >
          <RsvpIcon color="primary" sx={{ fontSize: 40 }}>{buttonText}</RsvpIcon>
        </IconButton> */}
        <Button onClick={handleClick}  variant={OnOff ? "outlined": "contained"}
        sx={{ marginBottom: 2, marginLeft: 2 }}>{OnOff ? 'cancel': 'sign up'}</Button>
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
          <Typography paragraph>{props.eDesc}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

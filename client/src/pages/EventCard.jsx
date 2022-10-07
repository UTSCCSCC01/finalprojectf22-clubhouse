import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import dateFormat from 'dateformat';
import EventIcon from '@mui/icons-material/Event';
import TimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';


import { Button, CardActionArea, CardActions } from '@mui/material';
import { useEffect,useState } from 'react';

export default function EventCard(props) {
  
  const [cName, setCname] = useState('');
  const [eDate, setEdate] = useState('');
  const [eName, setEname] = useState('');
  const [eTags, setETags] = useState([]);




  return (
    <>  
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardActionArea>
            <CardMedia
                component="img"
                height="250"
                image={props.eImage} alt="UTSC"/>
                    
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h7" component="h2">{props.eName} by {props.cName} </Typography>
                
                <Typography><EventIcon fontSize="small" ></EventIcon>  {dateFormat(props.eStartTime, "mmmm dS, yyyy")} </Typography>
                <Typography><TimeIcon fontSize="small"></TimeIcon> {dateFormat(props.eStartTime, "shortTime")} - {dateFormat(props.eEndTime, "shortTime")}</Typography>
                <Typography> <LocationOnIcon fontSize="small"></LocationOnIcon> {props.eLoc} </Typography>
                {/* <Typography>  {props.eDesc} </Typography>
                <Typography>  {props.eTags} </Typography> */}
                
            </CardContent>
        </CardActionArea>
            <CardActions>
                <Button size="small">More info</Button>
                <Button size="small" href={props.eJoin}>Sign up</Button>
            </CardActions>
        
    </Card>
    </>
  );
}
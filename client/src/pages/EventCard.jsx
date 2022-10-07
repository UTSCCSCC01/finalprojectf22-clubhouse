import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import dateFormat from 'dateformat';
import EventIcon from '@mui/icons-material/Event';
import TimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
// import Paper from '@mui/material/Paper';
// import Stack from '@mui/material/Stack';
// import { styled } from '@mui/material/styles';

import { Button, CardActionArea, CardActions } from '@mui/material';
import { useState } from 'react';

export default function EventCard(props) {
  
  const [cName, setCname] = useState('');
  const [eDate, setEdate] = useState('');
  const [eName, setEname] = useState('');
  const [eTags, setETags] = useState([]);

  // const Item = styled(Paper)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  //   ...theme.typography.body2,
  //   padding: theme.spacing(1),
  //   textAlign: 'center',
  //   color: theme.palette.text.secondary,
  // }));


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
                {/* <Typography>  {props.eDesc} </Typography> */}
                {/* <Typography> 
                               <Stack
                                direction={{ xs: 'column', sm: 'row' }}
                                spacing={{ xs: 1, sm: 2, md: 4 }}
                              >
                                <Item>{(props.eTag).map((tag) => (tag))}</Item>
                              </Stack>
                               </Typography> */}
                
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
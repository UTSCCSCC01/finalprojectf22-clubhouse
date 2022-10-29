import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useState } from 'react';
import '../styles.css';

/**
  * Component for user's personal card format.
  * @component
  * @example
  * return clubs.map((club, index) => (
      <MyClubsCard key={index} eImage={club.image} cName={club.clubName} cDesc={club.clubDesc} cPhone={club.clubPhone} cEmail={club.email}></MyClubsCard>
      ));
*/

function MyClubsCard(props) {
  
    const [cName, setCname] = useState('');
    const [cDesc, setCdesc] = useState('');
    const [cPhone, setCphone] = useState('');
    const [cEmail, setCemail] = useState('');
  
  return (
    <>

    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardActionArea>
            <CardMedia
                component="img"
                height="250"
                image={props.eImage} alt="Clubs"/>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h7" component="h2">{props.ePosition} </Typography>  
                <Typography >{props.cName} </Typography> 
                <Typography >{props.eMail} </Typography> 
            </CardContent>
        </CardActionArea>
            <CardActions>
                <Button size="small">View Club</Button>
                <Button size="small">View Events</Button>
                <Button size="small">View Postings</Button>
            </CardActions>
    </Card>
    </>
  );
}

export default MyClubsCard;
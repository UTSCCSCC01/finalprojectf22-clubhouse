import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useState } from 'react';
import '../styles.css';

/**
 * Component for club card format.
 * @component
 * @example
 * return scsuclubs.map((club, index) => (
      <SCSUClubCard key={index} eImage={club.image} cName={club.clubName} cPhone={club.clubPhone} cEmail={club.email}></SCSUClubCard>
      ));
 */

function SCSUClubCard(props) {
  
  const [cName, setCname] = useState('');
  const [cPhone, setCphone] = useState('');
  const [cEmail, setCemail] = useState('');


  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardActionArea>
            <CardMedia
                component="img"
                height="250"
                image={props.eImage} alt="Clubs"/>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h7" component="h2">{props.cName} </Typography> 
                <Typography >{props.cPhone} </Typography> 
                <Typography >{props.cEmail} </Typography> 
            </CardContent>
        </CardActionArea>
            <CardActions>
                <Button size="small">Delete Club</Button>
            </CardActions>
    </Card>
  );
}

export default SCSUClubCard;
import * as React from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useEffect,useState } from 'react';

export default function MultiActionAreaCard(props) {
  
  const [eName, setEname] = useState('');
  const [eDesc, setEdesc] = useState('');

  return (
    <Card className='card'>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
          alt=""
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.eName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.eDesc}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" href={props.eJoin}>
          Register for event.
        </Button>
      </CardActions>
    </Card>
  );
}

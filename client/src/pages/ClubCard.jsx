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
    <Card className='card' sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          image={props.eImage}
          alt="Clubs"
        />
        <CardContent>
          <Typography gutterBottom variant="h7" component="h2">
            {props.eName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.eDesc}
          </Typography>
        </CardContent>
      </CardActionArea>
        <CardActions>
          <Button size="small">View Club</Button>
        </CardActions>
    
    </Card>
  );
}
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import dateFormat from 'dateformat';

import { Button, CardActionArea, CardActions } from '@mui/material';
import { useEffect,useState } from 'react';

export default function EventCard(props) {
  
  const [cName, setCname] = useState('');
  const [eDate, setEdate] = useState('');
  const [eName, setEname] = useState('');
//   const [eDesc, setEdesc] = useState('');
//   const [eTags, setEtags] = useState('');


  return (


    <>
    
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardActionArea>
            <CardMedia
                component="img"
                height="250"
                image="https://www.logolynx.com/images/logolynx/3d/3d78fdda0795681f7ef19d5e1acc0858.png" alt="UTSC"/>
                    
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">{props.eName} by {props.cName} </Typography>
                <Typography>  Date: {dateFormat(props.eDate, "mmmm dS, yyyy")} </Typography>
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
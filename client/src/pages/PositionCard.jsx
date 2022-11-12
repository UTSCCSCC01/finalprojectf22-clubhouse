import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useState } from 'react';
import '../styles.css';

/**
 * Component for position card format.
 * @component
 * @example
 * return positions.map((positions, index) => (
      <PositionCard key={index} jobPosition={position.jobPosition} clubName={position.clubName} email={position.email}
       jobDescription={position.jobDesciption} jobRequirements={position.jobRequirements}></PositionCard>
      ));
 */

function PositionCard(props) {
  
    const [cName, setCName] = useState("");
    const [ePosition, setEPosition] = useState("");
    const [eMail, setEmail] = useState("");

  return (
    <>

    <Card raised sx={{ width: 350, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardActionArea>
            <CardMedia
                component="img"
                height="250"
                image={props.eImage} alt="Positions"/>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h7" component="h2">{props.ePosition} </Typography>  
                <Typography >{props.cName} </Typography> 
                <Typography >{props.eMail} </Typography> 
            </CardContent>
        </CardActionArea>
            <CardActions>
                <Button size="small">View Listing</Button>
            </CardActions>
    </Card>
    </>
  );
}

export default PositionCard;
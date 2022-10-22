import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActions, Box} from '@mui/material';
import { useState } from 'react';
import EventTag from "./EventTag.jsx"
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClubApplyButton from '../components/ClubApplyButton.jsx';

/**
 * Display fetched information in a card
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

export default function AllClubsCard(props) {
    const [cName, setCname] = useState('');
    const [cDesc, setCdesc] = useState('');
    const [cPhone, setCphone] = useState('');
    const [cEmail, setCemail] = useState('');

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

  return (
    <Card sx={{ maxWidth: 345 }} >
      <CardMedia
                component="img"
                height="250"
                image={props.cImage} alt="UTSC"/>
      <CardContent sx={{ flexGrow: 1, minWidth: 350 }}>
                <Typography gutterBottom variant="h7" component="h2">{props.cName} </Typography>  
                <Box display="inline-flex" flexWrap="wrap" mt="20px"> 
                    {(props.cTags).map((tag) => (
                        <EventTag data={tag}/> 
                    ))}
                </Box>
            
            </CardContent>
            
      <CardActions disableSpacing>
        <ClubApplyButton clubEmail={props.cEmail} clubName={props.cName} />
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
          <Typography paragraph>{props.cDesc}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActions, Box, CardActionArea, Backdrop, Dialog } from '@mui/material';
import { useState } from 'react';
import EventTag from "./EventTag.jsx"
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClubApplyButton from '../components/ClubApplyButton.jsx';
import StudentClubProfile from './StudentClubProfile.jsx';

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
  /**
     * setting expanded to true when clicked on image
     * 
     */
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [open, setOpen] = React.useState(false);
  /**
 * Set open to false
 */
  const handleClose = () => {
    setOpen(false);
  };
  /**
 * toggle open  
 */
  const handleToggle = () => {
    setOpen(!open);
  };
  return (

    <Card raised sx={{ maxWidth: 350 }} >
      <Dialog fullScreen open={open} onClose={handleClose}>
        <StudentClubProfile close={handleClose} img={props.cImage} phoneNumber={props.cPhone} clubName={props.cName} email={props.cEmail} description={props.cDesc}  ></StudentClubProfile>
      </Dialog>
      <CardActionArea onClick={handleToggle}>

        <CardMedia
          component="img"
          height="250"
          image={props.cImage} alt="UTSC" />
      </CardActionArea>
      <CardContent sx={{ flexGrow: 1, minWidth: 350, paddingBottom: 0 }}>
        <Typography variant="h5" component="h2" gutterBottom>{props.cName}</Typography>
        <Typography>{props.cEmail}</Typography>
        <Typography>{props.cPhone}</Typography>

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
          <Typography sx={{m: "0 4px 0 4px"}} paragraph>{props.cDesc}</Typography>
          <Box display="inline-flex" flexWrap="wrap" mt="20px">
            {(props.cTags).map((tag) => (
              <EventTag data={tag} />
            ))}
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
}

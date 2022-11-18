import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Dialog } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import '../styles.css';
import StudentClubProfile from './StudentClubProfile.jsx';

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

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

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
        <Card raised sx={{ width: 350 }}>
            <Dialog fullScreen open={open} onClose={handleClose}>
                <StudentClubProfile close={handleClose} img={props.eImage} phoneNumber={props.cPhone} clubName={props.cName} email={props.cEmail} description={props.cDesc}  ></StudentClubProfile>
            </Dialog>
            <CardActionArea onClick={handleToggle}>
                <CardMedia
                    component="img"
                    height="250"
                    image={props.eImage} alt="Positions" />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">{props.ePosition} </Typography>
                    <Typography >{props.cName} </Typography>
                    <Typography >{props.eMail} </Typography>
                </CardContent>
            </CardActionArea>

            <CardActions>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="View Listing"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography variant="h6">Job Description</Typography>
                    <Typography gutterBottom paragraph>{props.jobDesc}</Typography>
                    <Typography variant="h6">Job Requirements</Typography>
                    <Typography paragraph>{props.jobReqs}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}

export default PositionCard;
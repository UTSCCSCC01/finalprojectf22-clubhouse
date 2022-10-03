import React from 'react';
import { Typography , Container , makeStyles } from '@material-ui/core/';
import EventForm from './EventForm.jsx'

const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
});

const CreateEvent = () => {

    const classes = useStyles();

    return ( 
        <Container className={classes.container}>
            <Typography variant="h4" color="primary" align="center" gutterBottom>
                Create a New Event
            </Typography>

            <EventForm />

        </Container>
     );
}
 
export default CreateEvent;
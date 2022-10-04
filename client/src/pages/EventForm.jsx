import React from 'react';
import { Button, Container, makeStyles, TextField } from '@material-ui/core/';
import EventTimePicker from './EventTimePicker.jsx'
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const useStyles = makeStyles({
    field: {
        margin: 10,
        flex: 'auto',
        backgroundColor: "white",
        width: '100%',
    },

    btn: {
        width: 130,
        height: 48,
        fontSize: 17,
    },

    buttons: {
        display: 'flex',
        justifyContent: "space-between",
        padding: 0,
    },

    inputs: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    form: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        width: '550px',
    }
});

const EventForm = () => {

    const classes = useStyles();

    return (
        <Container className={classes.form}>
            <form className={classes.inputs} noValidate autoComplete='off'>
                <TextField
                    className={classes.field}
                    label="Event Name"
                    variant="outlined"
                    size="small"
                    required />

                <EventTimePicker />

                <TextField
                    className={classes.field}
                    label="Location"
                    variant="outlined"
                    size="small"
                    required />
                <TextField
                    className={classes.field}
                    label="Description"
                    variant="outlined"
                    multiline
                    size="small"
                    rows={6}
                    required />
            </form>

            <Container className={classes.buttons}>
                <Button
                    className={classes.btn}
                    onClick={() => console.log("Cancel event creation")}
                    variant="contained"
                    color="secondary"
                    endIcon={<HighlightOffIcon />}
                >Cancel</Button>
                <Button
                    className={classes.btn}
                    onClick={() => console.log("Event saved")}
                    type="submit"
                    variant="contained"
                    color="primary"
                    endIcon={<EventAvailableIcon />}
                >Save</Button>
            </Container>
        </Container>
    );
}

export default EventForm;
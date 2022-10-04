import React from 'react';
import { Button, Container, makeStyles, TextField, Box } from '@material-ui/core/';
import EventTimePicker from './EventTimePicker.jsx'
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import InputTags from './InputTags.jsx'

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
        margin: '16px'
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
        width: '500px',
        margin: '16px'
    }
});

const EventForm = () => {

    const classes = useStyles();

    return (
        <Box className={classes.form}>
            <Box className={classes.inputs} autoComplete='on' gridGap={3}>
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

                <InputTags />

                <TextField
                    className={classes.field}
                    label="Description"
                    variant="outlined"
                    multiline
                    size="small"
                    minRows={6}
                    required />
            </Box>

            <Box className={classes.buttons}>
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
            </Box>
        </Box>
    );
}

export default EventForm;
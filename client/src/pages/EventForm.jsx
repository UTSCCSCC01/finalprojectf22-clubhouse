import React, { useState } from 'react';
import { Button, makeStyles, TextField, Box } from '@material-ui/core/';
import EventTimePicker from './EventTimePicker.jsx'
import dayjs from 'dayjs';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import InputTags from './InputTags.jsx'

const useStyles = makeStyles({
    field: {
        margin: "10px",
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
        margin: '24px 0px 24px 0px'
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

    const [eventName, setName] = useState("");
    const [eventLoc, setLoc] = useState("");
    const [eventDesc, setDesc] = useState("");
    const [eventStartTime, setStartTime] = useState(dayjs().add(1, 'h').minute(0));
    const [eventEndTime, setEndTime] = useState(dayjs().add(2, 'h').minute(0));
    const [eventTags, setEventTags] = useState([]);

    const handleStartChange = (newValue) => {
        if (newValue.isAfter(eventEndTime)) {
            setEndTime(newValue.add(1, 'h'));
        }
        setStartTime(newValue);
    };

    const handleEndChange = (newValue) => {
        if (newValue.isBefore(eventStartTime)) {
            setStartTime(newValue.add(-1, 'h'));
        }
        setEndTime(newValue);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const clubName = "ClubHouse"
        const newEvent = { clubName, eventName, eventLoc, eventDesc, eventStartTime, eventEndTime, eventTags };

        fetch('http://localhost:5001/events/create', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEvent)
        }).then(() => {
            console.log(newEvent);
        })
    }

    return (
        <Box className={classes.form}>
            <Box className={classes.inputs} autoComplete='on' gridGap={10}>
                <TextField
                    className={classes.field}
                    label="Event Name"
                    variant="outlined"
                    required
                    value={eventName}
                    onChange={(e) => setName(e.target.value)}
                />

                <EventTimePicker start={eventStartTime} end={eventEndTime} handleStartChange={handleStartChange} handleEndChange={handleEndChange}/>

                <TextField
                    className={classes.field}
                    label="Location"
                    variant="outlined"
                    required
                    value={eventLoc}
                    onChange={(e) => setLoc(e.target.value)}
                />

                <InputTags tags={eventTags} setTags={setEventTags}/>

                <TextField
                    className={classes.field}
                    label="Description"
                    variant="outlined"
                    multiline
                    minRows={6}
                    required
                    value={eventDesc}
                    onChange={(e) => setDesc(e.target.value)}
                />
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
                    onClick={onSubmit}
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
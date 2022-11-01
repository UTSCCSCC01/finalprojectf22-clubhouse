import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { TextField, Box, Button, Stack } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import Resizer from "react-image-file-resizer";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { makeStyles } from '@material-ui/core';
import TagsInput from "./TagsInput.jsx"
import { getCookie } from '../libraries/cookieDAO'

const useStyles = makeStyles({
    timepicker: {
        width: "240px",
    },

    button: {
        width: "120px",
        height: "40px",
        fontSize: "17px",
    }
})

/**
 * Component for displaying blank event details form.
 * @component
 */

const EventForm = () => {

    const navigate = useNavigate();
    const classes = useStyles();

    // stores the url of the image
    const [eventImage, setEventImage] = useState("https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Utoronto_coa.svg/1200px-Utoronto_coa.svg.png");

    const [eventName, setEventName] = useState("");
    const [eventLoc, setEventLoc] = useState("");
    const [eventDesc, setEventDesc] = useState("");
    const [eventStartTime, setStartTime] = useState(dayjs().add(1, 'h').minute(0));
    const [eventEndTime, setEndTime] = useState(dayjs().add(2, 'h').minute(0));
    const [eventTags, setEventTags] = useState([]);
    const eventAttendees = [];

    /**
     * Update and store the event start time. Update the event 
     * end time if the start time occurs after the end time.
     * @param {dayjs} newValue 
     */

    const handleStartChange = (newValue) => {
        if (newValue.isAfter(eventEndTime)) {
            setEndTime(newValue.add(1, 'h'));
        }
        setStartTime(newValue);
    };

    /**
     * Update and store the event end time. Update the event 
     * start time if the end time occurs before the start time.
     * @param {dayjs} newValue 
     */

    const handleEndChange = (newValue) => {
        if (newValue.isBefore(eventStartTime)) {
            setStartTime(newValue.add(-1, 'h'));
        }
        setEndTime(newValue);
    };

    /**
     * Return a resized image.
     * @param {File} image 
     * @returns {Function} A base64 encoded image
     */

    const resizeFile = (image) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(image, 400, 400, "JPEG", 90, 0, (uri) => { resolve(uri); }, "base64" );
        });

    /**
     * Update the event image.
     * @param {Event} e 
     */

    const handleImgUpload = async (e) => {

        const file = e.target.files[0];
        const image = await resizeFile(file);
        setEventImage(image);

    }

    /**
     * Create the event and redirect to homepage.
     * @param {Event} e 
     */
    
    const onSubmit = (e) => {
        e.preventDefault();

        const clubName = getCookie("clubName");
        const newEvent = { clubName, eventName, eventImage, eventLoc, eventDesc, eventStartTime, eventEndTime, eventTags, eventAttendees };

        fetch('http://localhost:5001/events/create', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEvent)
        }).then(() => {

        }).catch((err) => {
            console.log(err);
        })
        navigate("/"); // change path
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center', width: '700px', margin: '16px' }}>

            <Box display="flex" margin="0" width="100%" alignItems="center" gap={4}>
                <Stack gap={0.5} alignItems="center">
                    <img src={eventImage}
                        alt={eventName}
                        border="1px"
                        style={{
                            borderColor: "#aaaaaa",
                            borderRadius: "4px",
                            objectFit: "cover",
                            objectPosition: "center"
                        }}
                        height="170px"
                        width="170px" />
                    <Button className={classes.button} startIcon={<PhotoCamera />} variant="text" component="label">
                        Upload
                        <input
                            onChange={handleImgUpload}
                            hidden
                            accept="image/*"
                            type="file" />
                    </Button>
                </Stack>

                <Stack width="100%">
                    <TextField
                        sx={{ backgroundColor: "white" }}
                        label="Event Name"
                        variant="outlined"
                        required
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)} />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Box whiteSpace='nowrap'>
                            <DesktopDatePicker
                                className={classes.timepicker}
                                label="Start Date"
                                inputFormat="MM/DD/YYYY"
                                value={eventStartTime}
                                onChange={handleStartChange}
                                required
                                renderInput={(params) => <TextField {...params} sx={{ marginTop: 3, marginRight: 1 }} />}
                            />
                            <TimePicker
                                className={classes.timepicker}
                                label="Start Time"
                                value={eventStartTime}
                                onChange={handleStartChange}
                                required
                                renderInput={(params) => <TextField {...params} sx={{ marginTop: 3, marginLeft: 1 }} />}
                            />
                        </Box>
                        <Box whiteSpace='nowrap'>
                            <DesktopDatePicker
                                className={classes.timepicker}
                                label="End Date"
                                inputFormat="MM/DD/YYYY"
                                value={eventEndTime}
                                onChange={handleEndChange}
                                renderInput={(params) => <TextField {...params} sx={{ marginTop: 3, marginRight: 1 }} />}
                            />
                            <TimePicker
                                className={classes.timepicker}
                                label="End Time"
                                value={eventEndTime}
                                onChange={handleEndChange}
                                renderInput={(params) => <TextField {...params} sx={{ marginTop: 3, marginLeft: 1 }} />}
                            />
                        </Box>
                    </LocalizationProvider>
                </Stack>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', }}>

                <TextField
                    sx={{ margin: "24px 0 24px 0", flex: 'auto', backgroundColor: "white", width: '100%', }}
                    label="Location"
                    variant="outlined"
                    required
                    value={eventLoc}
                    onChange={(e) => setEventLoc(e.target.value)}
                />

                <TagsInput tags={eventTags} setTags={setEventTags} />

                <TextField
                    sx={{ marginTop: "24px", flex: 'auto', backgroundColor: "white", width: '100%', }}
                    label="Description"
                    variant="outlined"
                    multiline
                    minRows={6}
                    required
                    value={eventDesc}
                    onChange={(e) => setEventDesc(e.target.value)}
                />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: "space-between", padding: 0, margin: '24px 0px 24px 0px' }}>
                <Button
                    className={classes.button}
                    onClick={() => navigate("/")} // change path
                    variant="contained"
                    color="secondary"
                    endIcon={<DeleteForeverOutlinedIcon />}
                >Delete</Button>
                <Button
                    className={classes.button}
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
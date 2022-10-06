import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { TextField, Box, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Tag from "./Tag.jsx"

const EventForm = () => {

    const navigate = useNavigate();

    const [eventName, setName] = useState("");
    const [eventLoc, setLoc] = useState("");
    const [eventDesc, setDesc] = useState("");
    const [eventStartTime, setStartTime] = useState(dayjs().add(1, 'h').minute(0));
    const [eventEndTime, setEndTime] = useState(dayjs().add(2, 'h').minute(0));
    const [eventTags, setEventTags] = useState([]);

    const tagRef = useRef();

    const handleTagKeyDown = (e) => {
        if (e.which !== 13) {
            return;
        }

        e.preventDefault();
        if (tagRef.current.value === "" || eventTags.includes(tagRef.current.value)) {
            tagRef.current.value = "";
            return;
        }

        setEventTags([...eventTags, tagRef.current.value]);
        tagRef.current.value = "";
    }

    const deleteTag = (toDelete) => {
        setEventTags(eventTags.filter((t) => t !== toDelete));
    }

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
        navigate("/"); // change path
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center', width: '512px', margin: '16px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                <TextField
                    sx={{ margin: "0", flex: 'auto', backgroundColor: "white", width: '100%', }}
                    label="Event Name"
                    variant="outlined"
                    required
                    value={eventName}
                    onChange={(e) => setName(e.target.value)} />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box whiteSpace='nowrap'>
                        <DesktopDatePicker
                            label="Start Date"
                            inputFormat="MM/DD/YYYY"
                            value={eventStartTime}
                            onChange={handleStartChange}
                            required
                            renderInput={(params) => <TextField {...params} sx={{ marginTop: 3, marginRight: 1 }} />}
                        />
                        <TimePicker
                            label="Start Time"
                            value={eventStartTime}
                            onChange={handleStartChange}
                            required
                            renderInput={(params) => <TextField {...params} sx={{ marginTop: 3, marginLeft: 1 }} />}
                        />
                    </Box>
                    <Box whiteSpace='nowrap'>
                        <DesktopDatePicker
                            label="End Date"
                            inputFormat="MM/DD/YYYY"
                            value={eventEndTime}
                            onChange={handleEndChange}
                            renderInput={(params) => <TextField {...params} sx={{ marginTop: 3, marginRight: 1 }} />}
                        />
                        <TimePicker
                            label="End Time"
                            value={eventEndTime}
                            onChange={handleEndChange}
                            renderInput={(params) => <TextField {...params} sx={{ marginTop: 3, marginLeft: 1 }} />}
                        />
                    </Box>
                </LocalizationProvider>

                <TextField
                    sx={{ margin: "24px 0 24px 0", flex: 'auto', backgroundColor: "white", width: '100%', }}
                    label="Location"
                    variant="outlined"
                    required
                    value={eventLoc}
                    onChange={(e) => setLoc(e.target.value)}
                />

                <Box display="flex" flexDirection="column"
                    sx={{
                        border: 1,
                        borderColor: "#D3D3D3",
                        borderRadius: "4px",
                        margin: "0",
                        width: "100%",
                        padding: "8px",
                        boxSizing: "border-box"
                    }}>

                    <Box display="inline-flex" flexWrap="wrap">
                        {eventTags.map((text, index) => {
                            return (
                                <Tag data={text} key={index} handleDelete={deleteTag} />
                            )
                        })}
                    </Box>

                    <TextField sx={{ margin: "8px" }}
                        variant='standard'
                        placeholder='Enter tags here'
                        onKeyDown={handleTagKeyDown}
                        inputRef={tagRef}>
                    </TextField>
                </Box>

                <TextField
                    sx={{ margin: "24px 0 24px 0", flex: 'auto', backgroundColor: "white", width: '100%', }}
                    label="Description"
                    variant="outlined"
                    multiline
                    minRows={6}
                    required
                    value={eventDesc}
                    onChange={(e) => setDesc(e.target.value)}
                />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: "space-between", padding: 0, margin: '24px 0px 24px 0px' }}>
                <Button
                    sx={{ width: "130px", height: "48px", fontSize: "17px", }}
                    onClick={() => navigate("/")} // change path
                    variant="contained"
                    color="secondary"
                    endIcon={<HighlightOffIcon />}
                >Cancel</Button>
                <Button
                    sx={{ width: "130px", height: "48px", fontSize: "17px", }}
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
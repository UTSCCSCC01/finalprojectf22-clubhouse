import React from "react";
import { useState } from "react";
import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useNavigate } from 'react-router';
import dayjs from "dayjs";
import { getCookie } from '../libraries/cookieDAO'
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

/**
 * Component for displaying a new announcements form
 * @component
 */

const NewAnnouncement = () => {

    const navigate = useNavigate();

    const [subject, setSub] = useState("");
    const [message, setMessage] = useState("");
    const [recipients, setRecips] = useState("everyone");

    const [open, setOpen] = useState(false);
    const [submitStatus, setStatus] = useState(""); // "success" or "error"

    const clearForm = () => {
        setSub("");
        setMessage("");
    }

    /**
     * Write the announcement to the database and redirect to the home page
     * @param {Event} e 
     */

    const onSubmit = (e) => {
        e.preventDefault();

        const clubName = getCookie("clubName");
        const clubEmail = getCookie("username");
        const time = dayjs().unix(); // time is represented as seconds since Epoch
        const newAnnouncement = { clubName, subject, message, recipients, time, clubEmail };

        fetch('http://localhost:5001/announcements/new', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newAnnouncement)
        }).then(() => {
            setStatus("success");
            setOpen(true);
        }).catch((err) => {
            console.log(err);
            setStatus("error");
            setOpen(true);
        })

        clearForm();
    };

    return (
        <Box
            gap={3.5}
            width="600px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            margin="120px auto 120px auto"
        >
            <Typography variant="h2" >New Announcement</Typography>

            <TextField
                fullWidth
                variant="outlined"
                label="Subject"
                value={subject}
                onChange={(e) => setSub(e.target.value)}
                required
            ></TextField>

            <TextField
                fullWidth
                multiline
                variant="outlined"
                minRows={4}
                value={message}
                required
                onChange={(e) => setMessage(e.target.value)}
                label="Message"
            ></TextField>

            <FormControl sx={{ marginLeft: "0", marginRight: "auto" }}>
                <FormLabel>Notify</FormLabel>
                <RadioGroup
                    row
                    defaultValue={recipients}
                    onChange={(e) => {
                        setRecips(e.target.value)
                    }}
                >
                    <FormControlLabel value="everyone" control={<Radio />} label="Everyone" />
                    <FormControlLabel value="members only" control={<Radio />} label="Members Only" />
                </RadioGroup>
            </FormControl>

            <Box sx={{ width: "100%", display: 'flex', justifyContent: "space-between" }}>
                <Button
                    sx={{ width: "120px" }}
                    onClick={clearForm}
                    variant="contained"
                    color="secondary"
                    endIcon={<DeleteForeverOutlinedIcon />}
                >Cancel</Button>
                <Button
                    onClick={onSubmit}
                    sx={{ width: "120px" }}
                    type="submit"
                    variant="contained"
                    color="primary"
                    endIcon={<SendIcon />}
                >Send</Button>
            </Box>

            <Collapse sx={{width: "100%"}} in={open}>
                <Alert
                    severity={submitStatus}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    {submitStatus === "success" ? "Announcement sent." : "Unable to send."}
                </Alert>
            </Collapse>
        </Box>
    );
}

export default NewAnnouncement;
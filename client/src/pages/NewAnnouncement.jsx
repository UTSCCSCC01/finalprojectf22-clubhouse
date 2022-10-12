import React from "react";
import { useState } from "react";
import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useNavigate } from 'react-router';
import dayjs from "dayjs";

const NewAnnouncement = () => {

    const navigate = useNavigate();

    const [subject, setSub] = useState("");
    const [message, setMessage] = useState("");
    const [recipients, setRecips] = useState("everyone");

    const onSubmit = (e) => {
        e.preventDefault();

        const clubName = "ClubHouse";
        const time = dayjs();
        const newAnnouncement = { clubName, subject, message, recipients, time };

        fetch('http://localhost:5001/announcements/new', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newAnnouncement)
        }).then(() => {

        }).catch((err) => {
            console.log(err);
        })
        navigate("/"); // change path
    };

    return (
        <Box
            gap={3}
            width="600px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            margin="120px auto 120px auto"
        >
            <Typography fontWeight={500} variant="h4" color="primary">New Announcement</Typography>

            <TextField
                fullWidth
                variant="outlined"
                label="Subject"
                onChange={(e) => setSub(e.target.value)}
                required
            ></TextField>

            <TextField
                fullWidth
                multiline
                variant="outlined"
                minRows={3}
                required
                onChange={(e) => setMessage(e.target.value)}
                label="Message"
            ></TextField>

            <FormControl sx={{marginLeft: "0", marginRight: "auto"}}>
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
                    sx={{width: "120px"}}
                    onClick={() => navigate("/")} // change path
                    variant="contained"
                    color="secondary"
                    endIcon={<DeleteForeverOutlinedIcon />}
                >Cancel</Button>
                <Button
                    onClick={onSubmit}
                    sx={{width: "120px"}}
                    type="submit"
                    variant="contained"
                    color="primary"
                    endIcon={<SendIcon />}
                >Send</Button>
            </Box>

        </Box>
    );
}

export default NewAnnouncement;
import React from "react";
import { useNavigate } from 'react-router';
import { Box, Typography, Button, TextField } from "@mui/material";
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input'
import { useState } from "react";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import SendIcon from '@mui/icons-material/Send';
import TagsInput from "./TagsInput.jsx"


const ClubRegisterReq = () => {

    const navigate = useNavigate();

    const [clubName, setClubName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [tags, setTags] = useState([]);
    const [desc, setDesc] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();

        // const clubName = "ClubHouse";
        // const newEvent = { clubName, eventName, eventImage, eventLoc, eventDesc, eventStartTime, eventEndTime, eventTags, eventAttendees };

        // fetch('http://localhost:5001/events/create', {
        //     method: 'POST',
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(newEvent)
        // }).then(() => {

        // }).catch((err) => {
        //     console.log(err);
        // })
        navigate("/"); // change path
    };

    return (
        <Box gap={3} sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "550px",
            margin: "100px auto 48px auto"
        }}>
            <Typography variant="h4" color="primary">
                Club Registration Request Form
            </Typography>

            <TextField
                sx={{ backgroundColor: "white" }}
                label="Club Name"
                variant="outlined"
                fullWidth
                required
                value={clubName}
                onChange={(e) => setClubName(e.target.value)}
            />

            <Box display="flex" flexDirection="row" width="100%" justifyContent="space-between">

                <TextField
                    sx={{ width: "48%" }}
                    label="Email"
                    required
                />

                <MuiTelInput
                    sx={{ width: "48%" }}

                    defaultCountry="CA"
                    onlyCountries={['CA', 'US']}
                    label="Phone Number (optional)"
                    value={phone}
                    onChange={(value) => setPhone(value)} />
            </Box>

            <TagsInput tags={tags} setTags={setTags} />


            <TextField
                sx={{ flex: 'auto', backgroundColor: "white", width: '100%', }}
                label="Description"
                variant="outlined"
                multiline
                minRows={6}
                required
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
            />

            <Box sx={{ width: "100%", display: 'flex', justifyContent: "space-between", padding: 0 }}>
                <Button
                    onClick={() => navigate("/")} // change path
                    variant="contained"
                    color="secondary"
                    endIcon={<DeleteForeverOutlinedIcon />}
                >Clear</Button>
                <Button

                    onClick={onSubmit}
                    type="submit"
                    variant="contained"
                    color="primary"
                    endIcon={<SendIcon />}
                >Submit Request</Button>
            </Box>
        </Box>
    );
}

export default ClubRegisterReq;
import React from "react";
import { useNavigate } from 'react-router';
import { Box, Typography, Button, TextField } from "@mui/material";
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input'
import { useState, useEffect } from "react";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import SendIcon from '@mui/icons-material/Send';
import TagsInput from "./TagsInput.jsx"
import Auth from "../components/AuthCheck.jsx";

const ClubRegisterReq = () => {

    const navigate = useNavigate();

    const [clubName, setClubName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [tags, setTags] = useState([]);
    const [desc, setDesc] = useState("");

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [descError, setDescError] = useState("");

    function isValid(cName, cEmail, cPhone, cDesc) {

        let valid = true;

        if (!cName) {
            setNameError("Name cannot be empty.")
            valid = false;
        }
        if (!cEmail) {
            setEmailError("Email cannot be empty.")
            valid = false;
        }
        if (!cDesc) {
            setDescError("Description cannot be empty.")
            valid = false;
        }

        if (cPhone && !matchIsValidTel(cPhone)) {
            setPhoneError("Not a valid phone number");
            valid = false;
        }

        return valid;

    }
    useEffect( ()  => {
        Auth({student: "/home", null: "/login", club: "/clubhome"});
    }, []);
    const onSubmit = async (e) => {
        e.preventDefault();

        if (!isValid(clubName, email, phone, desc)) {
            return;
        }

        const newClub = { clubName, email, phone, tags, desc };

        console.log(newClub);

        const responseObj = await fetch('http://localhost:5001/clubs/register-request/create', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newClub)
        })

        let response = await responseObj.json();
        console.log(response);

        if (response.failed) {
            if (response.nameTaken) {
                setNameError("This club name is already taken.");
            }
            if (response.emailTaken) {
                setEmailError("An account with this email already exists.");
            }
            return;
        }

        navigate("/club-signup-confirmation"); // redirect to confirmation page
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
                error={nameError !== ""}
                helperText={nameError}
                value={clubName}
                onBlur={() => setNameError("")}
                onChange={(e) => setClubName(e.target.value)}
            />

            <Box display="flex" flexDirection="row" width="100%" justifyContent="space-between">

                <TextField
                    sx={{ width: "48%" }}
                    label="Email"
                    required
                    value={email}
                    error={emailError !== ""}
                    helperText={emailError}
                    onBlur={() => setEmailError("")}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <MuiTelInput
                    sx={{ width: "48%" }}
                    error={phoneError !== ""}
                    helperText={phoneError}
                    defaultCountry="CA"
                    onlyCountries={['CA', 'US']}
                    label="Phone Number (optional)"
                    value={phone}
                    onBlur={() => setPhoneError("")}
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
                error={descError !== ""}
                helperText={descError}
                onBlur={() => setDescError("")}
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
import React from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input'
import { useState, useEffect } from "react";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import SendIcon from '@mui/icons-material/Send';
import TagsInput from "./TagsInput.jsx"
import Auth from "../components/AuthCheck.jsx";
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const ClubRegisterReq = () => {

    const [clubName, setClubName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [tags, setTags] = useState([]);
    const [desc, setDesc] = useState("");

    const [nameError, setNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [descError, setDescError] = useState("");

    const [open, setOpen] = useState(false);
    const [submitStatus, setStatus] = useState("error"); // "success" or "error"
    const successMessage = "Your club registration request has been successfully submitted. Your email will be contacted once a decision has been reached."
    const failMessage = "Unable to submit club request."

    const clearForm = () => {
        setClubName("");
        setPassword("");
        setEmail("");
        setPhone("");
        setDesc("");
        setTags([]);
    }

    function isValid(cName, cEmail, cPassword, cPhone, cDesc) {

        let valid = true;

        if (!cName) {
            setNameError("Name cannot be empty.")
            valid = false;
        }
        if (!cEmail) {
            setEmailError("Email cannot be empty.")
            valid = false;
        }
        if (!cPassword) {
            setPasswordError("Password cannot be empty.");
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

    useEffect(() => {
        Auth({ student: "/allclubs", null: "/login", club: "/clubMain" });
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!isValid(clubName, email, password, phone, desc)) {
            return;
        }

        const newClub = { clubName, email, phone, tags, desc, password };

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
            setStatus("error");
            setOpen(true);
            return;
        }

        setStatus("success");
        setOpen(true);
        clearForm();
    };

    return (
        <Box gap={3} sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "600px",
            margin: "120px auto 64px auto"
        }}>
            <Typography variant="h2" textAlign="center">
                Club Registration
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
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
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

            <TextField
                sx={{ backgroundColor: "white" }}
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                required
                error={passwordError !== ""}
                helperText={passwordError}
                value={password}
                onBlur={() => setPasswordError("")}
                onChange={(e) => setPassword(e.target.value)}
            />

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
                    onClick={clearForm}
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

            <Collapse sx={{width: "100%"}} in={open}>
                <Alert sx={{ mb: 2}}
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
                >
                    {submitStatus === "success" ? successMessage : failMessage}
                </Alert>
            </Collapse>

        </Box>
    );
}

export default ClubRegisterReq;
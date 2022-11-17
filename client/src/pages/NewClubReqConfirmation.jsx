import React from "react";
import { Box, Typography } from "@mui/material"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Auth from "../components/AuthCheck.jsx";
import { useEffect } from 'react';

const NewClubReqConfirmation = () => {
    useEffect( ()  => {
        Auth({student: "/home", null: "/login", club: "/clubhome"});
    }, []);
    return (
        <Box sx={{
            height: "100%",
            maxWidth: "500px",
            margin: "50px auto auto auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 3
        }}>
            <Typography 
            align="center"
            variant="h5"
            >
                Your club registration request has been successfully submitted. Your email will be contacted once a decision has been reached.
            </Typography>
            <CheckCircleIcon sx={{ fontSize: "80"}} color="success" />
        </Box>
    );
}

export default NewClubReqConfirmation;
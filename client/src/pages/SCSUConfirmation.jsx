import React from "react";
import { Box, Typography, IconButton, Container, Button } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router';

const SCSUConfirmation = () => {
    
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate("/SCSUclubreview");
    };

    return (
        <Container>

            <IconButton color="primary" aria-label="close" component="label" size="large" sx={{ margin: "100px auto 100px 850px"}}
            onClick={handleClick} >
                <CloseIcon fontSize="large" />
            </IconButton>
            
            <Box sx={{
            maxWidth: "500px",
            margin: "10px auto 10px auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
            }}>
            
                <Typography align="center" variant="h5">
                    Approved! 
                </Typography>
                
                <CheckCircleIcon sx={{ fontSize: "80"}} color="success" />
            </Box>

        </Container>
    );
}

export default SCSUConfirmation;
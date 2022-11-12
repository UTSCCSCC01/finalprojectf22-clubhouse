import React from "react";
import { Box, Typography, Container, Grid } from "@mui/material";
import { useEffect, useState } from 'react';
import ClubRequestCard from "./ClubRequestCard.jsx";

/**
 * Retrieve and display data from clubs-registration-request database
 * @component
 */
function SCSUclubreview(props){

    const [items, setItems ] = useState([]);

    /**
   * Fetch and set data from the database
   */
    useEffect(() => {
        const getrequests = async ()=>{
            const res = await fetch('http://127.0.0.1:5001/register-request');
            const data = await res.json();
            setItems(data); 
          };
          getrequests();
    },[]);

    return(
        <Box gap={3} sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "800px",
            margin: "100px auto 48px auto"
        }}>

            <Typography variant="h4" color="primary">
                Club Registration Requests
            </Typography>
            
            <Container maxWidth="lg" >
                <Grid container spacing={2} >
                    {items.map((item) => {
                        return (
                            <Grid item key={item}>
                                <ClubRequestCard key={item._id} cKey = {item._id} cName={item.clubName} cEmail={item.clubEmail} cPhone={item.clubPhone} cTags={item.clubTags} cDesc={item.clubDesc}/>
                            </Grid>)
                    })}
                </Grid>
          </Container>
        </Box>
    );
}
export default SCSUclubreview;

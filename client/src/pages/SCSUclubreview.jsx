import React from "react";
import { Box, Typography, Container, Grid } from "@mui/material";
import { useEffect, useState } from 'react';
import ClubRequestCard from "./ClubRequestCard.jsx";

/**
 * Retrieve and display data from clubs-registration-request database
 * @component
 */
function SCSUclubreview(props) {

    const [items, setItems] = useState([]);

    /**
   * Fetch and set data from the database
   */
    useEffect(() => {
        const getrequests = async () => {
            const res = await fetch('http://127.0.0.1:5001/register-request');
            const data = await res.json();
            setItems(data);
        };
        getrequests();
    }, []);

    return (
        <Box gap={3} sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "800px",
            margin: "120px auto 48px auto"
        }}>

            <Typography variant="h2" gutterBottom>
                Club Registration Requests
            </Typography>

            <Container maxWidth="lg" >
                <Grid container spacing={2} sx={{ justifyContent: "center" }}>
                    {items.length === 0 ?
                        <Typography variant="h5" color="#bbbbbb" m={4} textAlign="center">No club registration requests :(</Typography>
                        : items.map((item) => {
                            return (
                                <Grid item key={item}>
                                    <ClubRequestCard key={item._id} list={items} updateList={setItems} cKey={item._id} cName={item.clubName} cEmail={item.clubEmail} cPhone={item.clubPhone} cTags={item.clubTags} cDesc={item.clubDesc} cPass={item.password} />
                                </Grid>)
                        })}
                </Grid>
            </Container>
        </Box>
    );
}
export default SCSUclubreview;

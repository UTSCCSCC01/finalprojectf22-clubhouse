import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Container, Typography} from '@mui/material/';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import NotInterestedRoundedIcon from '@mui/icons-material/NotInterestedRounded';
import { IconButton } from '@material-ui/core';
import Grid from '@mui/material/Unstable_Grid2';


function RequestingMemberCard(props) {
    return(
        <Card sx={{ minWidth: 275}}>
            <CardContent >
            <Container sx={{marginBottom: "20px"}}>
                <Grid container spacing={1}>
                    <Grid item xs={8.5} sx={{ overflowX: "auto",}}>
                    <Typography variant="h7" component="div" sx={{marginTop: "6%"}}>
                    {props.name}
                    </Typography>
                    </Grid>
                    <Grid item xs={1.5}>
                        <IconButton>
                            <CheckBoxRoundedIcon aria-label="accept request" color='success'/>
                       </IconButton>
                    </Grid>
                    <Grid item xs={1.5}>
                        <IconButton>
                            <NotInterestedRoundedIcon aria-label="deny request" color='warning'/>
                       </IconButton>
                    </Grid>
                   
                </Grid>
                </Container>
            </CardContent>

        </Card>
    );
}

export default RequestingMemberCard;
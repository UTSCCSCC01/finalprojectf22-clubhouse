import React, { Component } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// class Events extends Component {
//   constructor(props) {
//     super(props);
//   }

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function Events() { 
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative"> <Toolbar></Toolbar> </AppBar>
      <main>
        <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 6, }}>
          <Container maxWidth="lg">
            <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>  Upcoming Events</Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Some text about upcoming events. 
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={5}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img" 
                    // sx={{// 16:9
                    //    pt: '56.25%',}}
                    height="140"
                    image="https://source.unsplash.com/random" alt="random"/>
                    
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">Event 1 </Typography>
                    <Typography>  This is Event 1 description. </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">More info</Button>
                    <Button size="small">Sign up</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
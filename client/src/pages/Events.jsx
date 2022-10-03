import React, { Component } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// class Events extends Component {
//   constructor(props) {
//     super(props);
//   }

// function Copyright() {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function Events() { 
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative"> <Toolbar></Toolbar> </AppBar>
      <main>
        {/* Hero unit */}
        <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 6, }}>
          <Container maxWidth="lg">
            <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>  Upcoming Events</Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Please browse through a list of upcoming events and sign up for those you are interested in!
            </Typography>
            {/* <Stack sx={{ pt: 4 }} direction="column" spacing={2} justifyContent="center"> */}
              {/* <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button> */}
            {/* </Stack> */}
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={5}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img" sx={{// 16:9
                       pt: '56.25%',}}
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
      {/* Footer */}
      {/* <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          UTSC ClubHouse
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Arai, Amy, Faraz, Noah, Tharuth, Priyank, Dhruv
        </Typography>
        <Copyright />
      </Box> */}
      {/* End footer */}
    </ThemeProvider>
  );
}
import React, { Component, useState } from 'react';
import { AppBar, Tabs, Tab, Toolbar, Button, Box } from '@mui/material'


// class Events extends Component {
//   constructor(props) {
//     super(props);
//   }

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

  const Navbar = () => {
    const [value, setValue] = useState();
    return (
        <React.Fragment>
            <AppBar sx={{ background: '#002A5C' }}>
                <Toolbar>
                   <Tabs sx = {{ marginLeft: 'auto' }} textColor="inherit" value={value} onChange={(e, value) => setValue(value)} indicatorColor="primary">
                       <Tab label="Home"></Tab>
                       <Tab label="Clubs"></Tab>
                       <Tab label="Events"></Tab>
                       <Tab label="My account"></Tab>
                    </Tabs> 
                      <Button sx={{ marginLeft: 'auto' }} variant="contained">Login</Button>
                      <Button sx={{ marginLeft: '10px' }} variant="contained">Sign up</Button>
                </Toolbar>
            </AppBar>
            {/* <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>UTSC ClubHouse</Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" component="p">Arai, Amy, Faraz, Noah, Tharuth, Priyank, Dhruv</Typography>
          <Copyright />
          </Box> */}
        </React.Fragment>
        
        
    )
  }

export default Navbar;
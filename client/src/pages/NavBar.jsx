import React, { Component, useState } from 'react';
import { AppBar, Tabs, Tab, Toolbar, Button } from '@mui/material'


// class Events extends Component {
//   constructor(props) {
//     super(props);
//   }

  
  const Navbar = () => {
    const [value, setValue] = useState();
    return (
        <React.Fragment>
            <AppBar sx={{ background: '#002A5C' }}>
                <Toolbar>
                   <Tabs sx = {{ marginLeft: 'auto' }}textColor="inherit" value={value} onChange={(e, value) => setValue(value)} indicatorColor="primary">
                       <Tab label="Home"></Tab>
                       <Tab label="Clubs"></Tab>
                       <Tab label="Events"></Tab>
                       <Tab label="My account"></Tab>
                    </Tabs> 
                      <Button sx={{ marginLeft: 'auto' }} variant="contained">Login</Button>
                      <Button sx={{ marginLeft: '10px' }} variant="contained">Sign up</Button>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
  }

export default Navbar;
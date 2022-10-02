import React, { Component } from 'react';
import  Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container'
import { AppBar, Tabs, Typography, Toolbar } from '@material-ui/core'


class Events extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <React.Fragment>
            <AppBar sx={{ background: '#063970' }}>
                <Toolbar>
                   <Tabs sx={{ marginLeft: 'auto' }} textColor="inherit">
                       <Tab label="Home"></Tab>
                    </Tabs> 
                </Toolbar>
            </AppBar>
        </React.Fragment>
      
    );
  }
}
export default Events;
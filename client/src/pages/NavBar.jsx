import React, { Component, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Tabs, Tab, Toolbar, Button, Box} from '@mui/material'
import NotificationMenu from '../components/NotificationMenu.jsx';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import config from  '../../config.json'
import dayjs from 'dayjs';
import { getCookie } from '../libraries/cookieDAO.js';

/**
 * Create navbar and change color
 * when selected
 * @component
 */
  class Navbar extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {
        menuAnchorEl: null,
        value: 0,
        notifs: []
      }

      this.menuHandler = function(e) {
        if (this.state.menuAnchorEl) {
          this.setState({menuAnchorEl: null});
        } else {
          this.setState({menuAnchorEl: e.currentTarget});
        }
      }

      this.menuHandler = this.menuHandler.bind(this);
    }

    componentDidMount() {
      const notifBody = {
        timespan: 604800, // 1 week
        email: getCookie("username")
      }

      const fetchOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notifBody)
      }

      fetch(config.api_url + "notif/get", fetchOptions).then(res => res.json()).then(res => this.setState({notifs: res}));
    }

    render() {
      return (
        <AppBar sx={{ background: '#002A5C' }}>
            <Toolbar>
                <Tabs sx = {{ marginLeft: 'auto' }} textColor="inherit" value={this.state.value} onChange={(e, value) => setState({value})} indicatorColor="primary">
                    <Tab label="Home"></Tab>
                    <Tab label="Clubs"></Tab>
                    <Tab label="Events"></Tab>
                    <Tab label="Job Postings"></Tab>
                    <Tab label="My account"></Tab>
                </Tabs>
                  <Button sx={{ marginLeft: 'auto' }} variant="contained" onClick={this.menuHandler}><NotificationsActiveIcon /></Button>
                  <NotificationMenu anchorEl={this.state.menuAnchorEl} onClose={this.menuHandler} notifs={this.state.notifs}/>
                  <Button sx={{ marginLeft: '10px' }} variant="contained"><NavLink to={"/login"}>Login</NavLink></Button>
                  <Button sx={{ marginLeft: '10px' }} variant="contained"><NavLink to={"/register"}>Register</NavLink></Button>
            </Toolbar>
        </AppBar>
      )
    }
  }

export default Navbar;
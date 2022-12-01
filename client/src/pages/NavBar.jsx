import React, { Component, useState, useEffect} from 'react';
import { AppBar, Tabs, Tab, Toolbar, Button, Box, Grid, Link, } from '@mui/material'
import NotificationMenu from '../components/NotificationMenu.jsx';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import config from  '../../config.json'
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { getCookie } from '../libraries/cookieDAO.js';
import Typography from '@mui/material/Typography';
import {usePath} from '@mui/material';
import {
  MemoryRouter,
  Route,
  Routes,
  matchPath,
  useLocation,
} from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}
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
        notifs: [],
        account: getCookie("accountType")
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
      // this.state.account = getCookie("accountType");
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

    handleLogout = () => {
    // logout();
    // location.href = "http://localhost:5001/logout";
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "accountType=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "clubName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    location.href = "http://localhost:3000/allclubs";
    console.log("logout");
    }
    

    handleChange = (event, newValue) => {
      this.setState({value: newValue});
    };


  Router(props) {
  const { children } = props;
  if (typeof window === 'undefined') {
    return <StaticRouter location="/drafts">{children}</StaticRouter>;
  }

  return (
    <MemoryRouter initialEntries={['/drafts']} initialIndex={0}>
      {children}
    </MemoryRouter>
  );
}


useRouteMatch = (patterns) => {
  const pathname = window.location.href;
  console.log(pathname);

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const fullPattern = 'http://localhost:3000'+pattern;
    console.log(fullPattern);
    if (pathname==fullPattern) {
      return i;
    }
  }

  console.log("no match");
  return null;
}

    asStudent = () => {

      if(window.location.href=="http://localhost:3000/testlogin"){
        location.href = "http://localhost:3000/allclubs";
      }

      const routes = ['/allclubs', '/events', '/positions','/MyAccount'];
      const index = this.useRouteMatch(routes);
      
      this.state.value = (index!=null) ? index : 0;
      // this.state.value = 2;
      console.log(this.state.value);
      return (
        <AppBar sx={{ background: '#002A5C' }}>
            <Toolbar>
                <Tabs sx = {{ marginLeft: 'auto' }}  textColor="inherit" value={this.state.value} onChange={this.handleChange} indicatorColor="primary">

                    <Tab label="Clubs" value={0} href={routes[0]}/>
                    <Tab label="Events" value={1} href={routes[1]}/>
                    <Tab label="Job Postings" value={2} href={routes[2]}/>
                    {/* <LinkTab label="Job Postings" href='/positions'/> */}
                    <Tab label="My Account" value={3} href={routes[3]} />
                </Tabs>
                  <Button sx={{ marginLeft: 'auto' }} variant="contained" onClick={this.menuHandler}><NotificationsActiveIcon /></Button>
                  <NotificationMenu width="300px" anchorEl={this.state.menuAnchorEl} onClose={this.menuHandler} notifs={this.state.notifs}/>
                  <Button sx={{ marginLeft: '10px' }} variant="contained" onClick={this.handleLogout}> Logout</Button>
            </Toolbar>
        </AppBar>
      )
    }

    asClub = () => {

      if(window.location.href=="http://localhost:3000/testlogin"){
        location.href = "http://localhost:3000/clubMain";
      }

      const routes = ['/clubMain', '/new-announcement', '/create-event','/create-position','/club-admin-profile'];
      const index = this.useRouteMatch(routes);
      
      this.state.value = (index!=null) ? index : 0;

      console.log(this.state.value);
      return (
        <AppBar sx={{ background: '#002A5C' }}>
            <Toolbar>
                <Tabs sx = {{ marginLeft: 'auto' }}  textColor="inherit" value={this.state.value} onChange={this.handleChange} indicatorColor="primary">

                    <Tab label="Home" value={0} href={routes[0]}/>
                    <Tab label="Make an Announcement" value={1} href={routes[1]}/>
                    <Tab label="Create an Event" value={2} href={routes[2]}/>
                    <Tab label="Create a Position" value={3} href={routes[3]}/>
                    <Tab label="Profile" value={4} href={routes[4]}/>
                   
                </Tabs>
                  <Button sx={{ marginLeft: 'auto' }} variant="contained" onClick={this.handleLogout}> Logout</Button>
            </Toolbar>
        </AppBar>
      )
    }
    

    asAdmin = () => {

      if(window.location.href=="http://localhost:3000/testlogin"){
        location.href = "http://localhost:3000/SCSUClubs";
      }

      const routes = ['/SCSUClubs', '/SCSUclubreview'];
      const index = this.useRouteMatch(routes);
      
      this.state.value = (index!=null) ? index : 0;

      console.log(this.state.value);
      return (
        <AppBar sx={{ background: '#002A5C' }}>
            <Toolbar>
                <Tabs sx = {{ marginLeft: 'auto' }}  textColor="inherit" value={this.state.value} onChange={this.handleChange} indicatorColor="primary">

                    <Tab label="Manage Clubs" value={0} href={routes[0]}/>
                    <Tab label="Club Requests" value={1} href={routes[1]}/>
                </Tabs>
                  <Button sx={{ marginLeft: 'auto' }} variant="contained" onClick={this.handleLogout}> Logout</Button>
            </Toolbar>
        </AppBar>
      )
    }

    notLoggedIn = () => {

      
     
      const routes = [ '/allclubs', '/events'];
      const index = this.useRouteMatch(routes);
      
      this.state.value = (index!=null) ? index : 0;
      return (
        <AppBar sx={{ background: '#002A5C' }}>
            <Toolbar>
            <Grid container direction='row' justifyContent="flex-end" alignItems="center" >
                <Grid item xs={4.75}>
                <Tabs textColor="inherit" onChange={this.handleChange} value={this.state.value} indicatorColor="primary">
                    <Tab label="Clubs" href={routes[0]}></Tab>
                    <Tab label="Events" href={routes[1]}></Tab>
                </Tabs>
                </Grid>
                <Grid item xs={2}>
                <Grid container direction='row' justifyContent="flex-end" alignItems="center" spacing ={2} >
                <Grid item>
                  <Button sx={{
                      ":visited": { backgroundColor: "#1976d2" },
                      ":visited:hover": { backgroundColor: "#1565c0" }
                    }}
                    textColor="inherit" variant="contained" href ={"/login"}>Login</Button>
                  </Grid>
                  <Grid item>
                  <Button sx={{
                      ":visited": { backgroundColor: "#1976d2" },
                      ":visited:hover": { backgroundColor: "#1565c0" }
                    }}
                    textColor="inherit" variant="contained" href ={"/register"}>Register</Button>
                  </Grid>
                  </Grid>
                  </Grid>
                  </Grid>
            </Toolbar>
        </AppBar>
      )
    }

   

 
    render() {
      return (this.state.account=="student")? (this.asStudent()) : (this.state.account=="club")?(this.asClub()) : (this.state.account=="admin")?(this.asAdmin()) : (this.notLoggedIn());
    }
  }


export default Navbar;
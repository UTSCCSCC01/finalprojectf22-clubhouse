import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import { Typography } from '@mui/material';
import MyClubs from './MyClubs.jsx';
import MyEvents from './MyEvents.jsx';
import Auth from '../components/AuthCheck.jsx';
import { useEffect } from 'react';


/**
 * MUI tabs managing function.
 */
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  

/**
 * MyAccounts
 * @component
 */
function MyAccounts(props) {

const [value, setValue] = React.useState(0);
/**
 * CHanges the value depending on what tab was clicked
 */
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect( ()  => {
    Auth({admin: "/clubmain", null: "/login", club: "/clubhome"});
  }, []);


  return (
    <Box sx={{ width: '90%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', width: "320px", marginLeft:"50px", marginTop:"100px"}}>
        <Tabs value={value} onChange={handleChange} >
          <Tab label="My Clubs" {...a11yProps(0)} />
          <Tab label="My Events" {...a11yProps(1)} />
          <Tab label="Settings" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <MyClubs></MyClubs>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MyEvents></MyEvents>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}

export default MyAccounts;

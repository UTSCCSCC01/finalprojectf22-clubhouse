import React from "react";
import AllClubsCard from "./AllClubsCard.jsx";
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

/**
 * Fetch club data from the database.
 * @component
 */
function AllClubs(props) {

  const [search, setSearch] = useState("");

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const [tags, setTags] = useState([]);
  const [tagName, setTagName] = React.useState([]);

  /**
   * Set multiselect component values. 
   * @param {string} event 
   */
  const handleChangeTag = (event) => {
    const {
      target: { value },
    } = event;
    setTagName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const [items, setItems] = useState([]);
  const TagMapped = [];
  for (var key in tags) {
    for (var key2 in tags[key]) {
      if (key2 === "clubTags") {
        for (var tagKey in tags[key][key2]) {
          TagMapped.push(tags[key][key2][tagKey]);
        }
      }
    }
  }

  let contains = false;
  /**
   * Check whether arrayTag includes any of checkedTags
   * @param {array} arrayTag 
   */
  const conTains = (arrayTag) => {
    contains = false;
    tagName.forEach((checkedTag) => {
      if ((arrayTag.clubTags).includes(checkedTag)) {
        contains = true;
        return contains;
      }
    })
    return contains;
  };
  let containsS = false;
  /**
     * Check whether the club object matches the search string
     * @param {array} arrayTag 
     */
  const conTainsS = (arrayTag) => {
    containsS = false;
    if (arrayTag.clubName.toLowerCase().includes(search.toLowerCase()) || arrayTag.clubDesc.toLowerCase().includes(search.toLowerCase())) {
      containsS = true;
      return containsS;
    }
    arrayTag.clubTags.forEach((clubTAG) => {
      if (clubTAG.toLowerCase().includes(search.toLowerCase())) {
        containsS = true;
        return containsS;
      }
    })
    return containsS;
  };

  /**
   * Fetch and set data from the database
   * every time the value of tagName changes. 
   */
  useEffect(() => {
    const getclubs = async () => {
      const res = await fetch('http://127.0.0.1:5001/clubs');
      const data = await res.json();
      setItems(data);
    };
    getclubs();
  }, [tagName]);

  /**
   * Fetch and set tags from the database
   */
  useEffect(() => {
    const gettags = async () => {
      /**
       * Fetch event tags from the database and set them to multiselect component
       */
      const resTags = await fetch('http://127.0.0.1:5001/clubtags');
      const dataTags = await resTags.json();
      setTags(dataTags);
    };
    gettags();
  }, []);

  return (
    <div>
      <Box sx={{ bgcolor: 'background.paper', mt: "120px", mb: "12px" }}>
        <Container maxWidth="lg" fixec>
          <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>UTSC Clubs</Typography>
          <Grid maxWidth="lg" align="center">
            <TextField
              sx={{ m: 1.5, width: 500 }}
              id="outlined-start-adornment"
              variant="outlined"
              label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                endAdornment: <InputAdornment position="start"><SearchIcon></SearchIcon></InputAdornment>,
              }}
            ></TextField>
            <FormControl
              sx={{ m: 1.5, width: 250 }} >
              <InputLabel id="multiple-checkbox-label">Categories</InputLabel>
              <Select
                labelId="multiple-checkbox-label"
                id="multiple-checkbox"
                multiple
                value={tagName}
                onChange={handleChangeTag}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {TagMapped.map((tag) => (
                  <MenuItem key={tag} value={tag}>
                    <Checkbox checked={tagName.indexOf(tag) > -1} />
                    <ListItemText primary={tag} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Container>
      </Box>
      <Container maxWidth="lg">
        <Grid container>
          {items.map((item) => {
            if ((search === "" && Object.keys(tagName).length == 0) || (search !== "" && conTainsS(item)) || (conTains(item)) || (conTainsS(item) && !conTainsS(item))) {
              return (
                <Grid sx={{ m: 2 }} item key={item}>
                  <AllClubsCard key={item._id} cName={item.clubName} cPhone={item.clubPhone} cDesc={item.clubDesc} cEmail={item.email} cImage={item.image} cTags={item.clubTags} />
                </Grid>)
            }
            else {
              return (<Grid item key={item}></Grid>)
            }
          })}
        </Grid>
      </Container>
    </div>
  );
}
export default AllClubs;
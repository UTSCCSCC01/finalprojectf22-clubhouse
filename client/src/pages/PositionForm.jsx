import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { TextField, Box, Button, Stack } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import Resizer from "react-image-file-resizer";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { makeStyles } from '@material-ui/core';
import TagsInput from "./TagsInput.jsx"

const useStyles = makeStyles({
    timepicker: {
        width: "240px",
    },

    button: {
        width: "120px",
        height: "40px",
        fontSize: "17px",
    }
})

/**
 * Component for displaying blank job posting/positions form.
 * @component
 */

const PositionForm = () => {

  const navigate = useNavigate();
  const classes = useStyles();

  const [clubImage, setclubImage] = useState("https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Utoronto_coa.svg/1200px-Utoronto_coa.svg.png");
  const [clubName, setclubName] = useState("");
  const [jobPosition, setjobPosition] = useState("");
  const [jobDescription, setjobDescription] = useState("");
  const [jobRequirements, setjobRequirements] = useState("");
  const [email, setemail] = useState("");

  /**
   * Return a resized image.
   * @param {File} image 
   * @returns {Function} A base64 encoded image
   */
  const resizeFile = (image) =>
      new Promise((resolve) => {
          Resizer.imageFileResizer(image, 400, 400, "JPEG", 90, 0, (uri) => { resolve(uri); }, "base64" );
      });

  /**
   * Update the club image.
   * @param {Position} e 
   */
  const handleImgUpload = async (e) => {

      const file = e.target.files[0];
      const image = await resizeFile(file);
      setclubImage(image);

  }

  /**
   * Create the position and redirect to homepage.
   * @param {Position} e 
   */
  const onSubmit = (e) => {
      e.preventDefault();

      const newPosition = { clubName, jobPosition, jobDescription, jobRequirements, email, clubImage };

      fetch('http://localhost:5001/positions/create', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newPosition)
      }).then(() => {
        
      }).catch((err) => {
          console.log(err);
      })
      
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center', width: '700px', margin: '16px' }}>

      <Box display="flex" margin="0" width="100%" alignItems="center" gap={4}>
        <Stack gap={0.5} alignItems="center">
          <img src={clubImage}
            alt={clubName}
            border="1px"
            style={{
              borderColor: "#aaaaaa",
              borderRadius: "4px",
              objectFit: "cover",
              objectPosition: "center"
            }}
            height="170px"
            width="170px" />
          <Button className={classes.button} startIcon={<PhotoCamera />} variant="text" component="label">
            Upload
            <input
              onChange={handleImgUpload}
              hidden
              accept="image/*"
              type="file" />
          </Button>
        </Stack>

        <Stack width="100%">
          <TextField
            sx={{ backgroundColor: "white" }}
            label="Job Position"
            variant="outlined"
            required
            value={jobPosition}
            onChange={(e) => setjobPosition(e.target.value)} />
            <TextField
            sx={{ backgroundColor: "white", marginTop: 3, }}
            label="Club Name"
            variant="outlined"
            required
            value={clubName}
            onChange={(e) => setclubName(e.target.value)} />
        </Stack>

      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', }}>

        <TextField
          sx={{ flex: 'auto', backgroundColor: "white", width: '100%', }}
          label="Contact Email"
          variant="outlined"
          required
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />

        <TextField
          sx={{ marginTop: "24px", flex: 'auto', backgroundColor: "white", width: '100%', }}
          label="Job Description"
          variant="outlined"
          multiline
          minRows={4}
          required
          value={jobDescription}
          onChange={(e) => setjobDescription(e.target.value)}
        />

        <TextField
          sx={{ marginTop: "24px", flex: 'auto', backgroundColor: "white", width: '100%', }}
          label="Job Requirements"
          variant="outlined"
          multiline
          minRows={7}
          required
          value={jobRequirements}
          onChange={(e) => setjobRequirements(e.target.value)}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: "space-between", padding: 0, margin: '24px 0px 24px 0px' }}>
        <Button
          className={classes.button}
          onClick={() => navigate("/")} // change path
          variant="contained"
          color="secondary"
          endIcon={<DeleteForeverOutlinedIcon />}
        >Delete</Button>
        <Button
          className={classes.button}
            onClick={onSubmit}
            type="submit"
            variant="contained"
            color="primary"
            endIcon={<EventAvailableIcon />}
        >Save</Button>
      </Box>
    </Box>
  );
}

export default PositionForm;
import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Box, makeStyles } from "@material-ui/core";
import { Stack } from '@mui/material/';

const useStyles = makeStyles({
  picker: {
    width: '232px',
  }
})

const EventTimePicker = () => {
  const [start, setStart] = React.useState(dayjs().add(1, 'h').minute(0));
  const [end, setEnd] = React.useState(dayjs().add(2, 'h').minute(0));

  const handleStartChange = (newValue) => {
    setStart(newValue);
    setEnd(newValue.add(1, 'h'));
  };

  const handleEndChange = (newValue) => {
    setEnd(newValue);
  };

  const classes = useStyles();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack>
        <Box whiteSpace='nowrap'>
          <DesktopDatePicker
            className={classes.picker}
            label="Start Date"
            inputFormat="MM/DD/YYYY"
            value={start}
            onChange={handleStartChange}
            required
            renderInput={(params) => <TextField {...params} sx={{ m: 1.5 }} />}
          />
          <TimePicker
            className={classes.picker}
            label="Start Time"
            value={start}
            onChange={handleStartChange}
            required
            renderInput={(params) => <TextField {...params} sx={{ m: 1.5 }} />}
          />
        </Box>
      </Stack>
      <Stack>
        <Box whiteSpace='nowrap'>
          <DesktopDatePicker
            className={classes.picker}
            label="End Date"
            inputFormat="MM/DD/YYYY"
            value={end}
            onChange={handleEndChange}
            renderInput={(params) => <TextField {...params} sx={{ m: 1.5 }} />}
          />
          <TimePicker
            className={classes.picker}
            label="End Time"
            value={end}
            onChange={handleEndChange}
            renderInput={(params) => <TextField {...params} sx={{ m: 1.5 }} />}
          />
        </Box>
      </Stack>

    </LocalizationProvider>
  );
}

export default EventTimePicker;
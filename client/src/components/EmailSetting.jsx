import { Checkbox, FormControl, FormControlLabel, Paper, Typography } from "@mui/material"
import React from "react"

const EmailSetting = props => {
    return (
        <React.Fragment>
            <FormControlLabel control={<Checkbox checked={props.checked} onChange={props.onChange} />} label={props.clubName} />
            <br></br>
        </React.Fragment>
        
    )
}

export default EmailSetting;
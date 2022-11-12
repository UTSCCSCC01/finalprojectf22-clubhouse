import { Checkbox, Paper, Typography } from "@mui/material"
import React from "react"

const EmailSetting = props => {
    return (
        <Paper>
            <Typography>{props.children}</Typography>
            <Checkbox checked={props.checked} sx={{marginLeft: 'auto'}} onChange={props.onChange}></Checkbox>
        </Paper>
    )
}

export default EmailSetting;
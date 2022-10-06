import React from 'react';
import { Box, Typography } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const Tag = ({ data, handleDelete }) => {
    return (
        <Box display="inline-flex" sx={{
            background: "#eeeeee",
            borderRadius: "18px",
            margin: "4px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "3px",
        }}>
            <Typography marginLeft="12px" marginRight="4px">{data}</Typography>
            <HighlightOffIcon color="primary"
                sx={{padding: "4px", 
                marginRight: "2px", 
                cursor: "pointer", 
                ":hover": { color: "red" }}} 
                onClick={() => { handleDelete(data) }} />
        </Box>
    );
}

export default Tag;
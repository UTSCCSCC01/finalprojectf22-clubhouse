import React from 'react';
import { Box, Typography } from '@mui/material'

/**
 * Component for displaying a single tag
 * @component
 * @param {String} data The text of the tag
 * @param {Function} handleDelete A function that deletes this tag from an array of tags
 */
const EventTag = ({ data}) => {
    return (
        
        <Box display="inline-flex" sx={{
            background: "#eeeeee",
            borderRadius: "20px",
            margin: "4px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "6px 8px 6px 8px",
        }}>

        <Typography align="center">{data}</Typography>
        </Box>
    );
}

export default EventTag;
import React from 'react';
import { Box, Typography } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

/**
 * Component for displaying a single tag
 * @param {String} data The text of the tag
 * @param {Function} handleDelete A function that deletes this tag from an array of tags
 */
const Tag = ({ data, handleDelete }) => {
    return (
        <Box display="inline-flex" sx={{
            background: "#eeeeee",
            borderRadius: "18px",
            margin: "4px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "3px 4px 3px 12px",
        }}>
            <Typography>{data}</Typography>
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
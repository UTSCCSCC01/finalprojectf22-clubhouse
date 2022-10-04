import React from 'react';
import { Box, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

const Tag = ({ data, handleDelete }) => {
    return (
        <Box display="inline-flex" sx={{
            background: "#eeeeee",
            borderRadius: "4px",
            margin: "4px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "4px",
        }}>
            <Typography marginLeft="8px" marginRight="8px">{data}</Typography>
            <CloseIcon color="primary"
                sx={{ marginRight: "2px", cursor: "pointer", ":hover": { color: "red" } }} onClick={() => { handleDelete(data) }} />
        </Box>
    );
}

export default Tag;
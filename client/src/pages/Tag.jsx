import React from 'react';
import { Box, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

const Tags = ({ data, handleDelete }) => {
    return (
        <Box display="flex" sx={{
            background: "#eeeeee",
            borderRadius: "4px",
            marginRight: "8px",
            padding: "1px",
        }}>
            <Box display="flex" justifyContent="center" alignItems="center" padding="4px">
                <Typography marginLeft="8px" marginRight="8px">{data}</Typography>
                <CloseIcon color="primary"
                    sx={{ marginRight: "2px", cursor: "pointer", ":hover": { color: "red" } }} onClick={() => { handleDelete(data) }} />
            </Box>
        </Box>
    );
}

export default Tags;
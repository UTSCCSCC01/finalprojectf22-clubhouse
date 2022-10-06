import React, { useState, useEffect } from 'react';
import { Button, Box } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const UploadImage = () => {

    const [image, setImage] = useState(null); // add a default image
    const [imageUrl, setImageUrl] = useState("https://tpasc.ca/sites/default/files/portal_logo/utsc-portal-logo.png");

    useEffect(() => {
        if (image) {
            setImageUrl(URL.createObjectURL(image));
        }
    }, [image]);

    return (
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Box sx={{ border: 3, borderColor: "#777777", borderRadius: "4px" }}>
                <img src={imageUrl} style={{objectFit: "cover", objectPosition: "center"}} height="200px" width="200px" />
            </Box>
            <Button startIcon={<PhotoCamera />} variant="contained" component="label">
                Upload
                <input
                    hidden
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    type="file" />
            </Button>
        </Box>


    );
}

export default UploadImage;
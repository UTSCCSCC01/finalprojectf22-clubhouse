import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

/**
 * Card for displaying announcements
 * @component
 */

const AnnouncementCard = props => {
    const a = props.announcement;

    return (
        <Card sx={{display: 'flex', flexDirection: 'column', width: "280px"}}>
            <CardActionArea>
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography fontWeight={500} fontSize="18px" >{a.clubName} </Typography>  
                    <Typography fontWeight={500} fontSize="16px" >{a.subject} </Typography> 
                    <Typography variant="body2">{a.message} </Typography> 
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default AnnouncementCard;
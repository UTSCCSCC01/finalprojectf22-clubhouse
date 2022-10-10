import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { FitScreen } from '@mui/icons-material';


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function MemberCard(props) {
  return (
    <Card  >
      <CardContent>
        
        <Typography variant="h7" component="div">
          {props.name}
        </Typography>
        
      </CardContent>

    </Card>
  );
}

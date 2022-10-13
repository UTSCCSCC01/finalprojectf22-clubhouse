import React from 'react';
import { Container, Stack, Typography, Grid, Divider,Box, Dialog, DialogTitle,DialogContent,DialogContentText } from '@mui/material';
import { useState, useEffect } from 'react';
import MemberCard from './MemberCard1.jsx';
import { margin } from '@mui/system';
import PotentialMemCard from './PotentialMemCard.jsx';

export default function ClubAdminMain() {
    const [members,setMembers] = useState([]);

    const [potentialMembers, setPotentialMembers] = useState(['yo','bro']);
    useEffect(  ()  => {
          const  fetchmembers = async () => {
            const res = await fetch("http://127.0.0.1:5001/club/members");
          const data = await res.json();
          
          setMembers(data.members);
          
        } 
        fetchmembers();

      },[] );
      
    return (
        <Grid>
        <Typography style={{marginTop:'90px', textAlign:'center'}} variant="h3">Welcome CLUBNAME</Typography>
        <Grid container rowSpacing={3} margin={1} padding={2} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
            
            <Grid item xs={6}  >
                <Typography style={{textAlign:'center', marginBottom:'20px'}} variant="h4">Current Members</Typography>
                <div className='cons'>
                <Stack   spacing={1}  style={{width:'300px', textAlign:'center', margin:'0 auto'}} divider={<Divider orientation="horizontal" flexItem />}>
                    {members.map((member) => {
                        return <MemberCard name = {member}/>
                    }
                    ) }
        
                 </Stack>
                 </div>
            </Grid>
            
            <Grid item xs={6}>
            <Typography style={{textAlign:'center', marginBottom:'20px'}} variant="h4">Requesting Members</Typography>
            <div className='cons'>
                <Stack spacing={1} style={{width:'400px', textAlign:'center', margin:'0 auto'}}>
                {potentialMembers.map((member) => {
                        return (
                        <><PotentialMemCard   name = {member}/>
                                    
                        </>);
                    }
                    ) }
                </Stack>
                
            </div>
            </Grid>
  
        </Grid>
        </Grid>
      
      
    );
  }
  
import React from 'react';
import { Container, Stack, Typography, Grid, Divider } from '@mui/material';
import { useState, useEffect } from 'react';
import MemberCard from './MemberCard1.jsx';
import { margin } from '@mui/system';
export default function ClubAdminMain() {
    const [members,setMembers] = useState([]);
    
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
                <Typography style={{textAlign:'center'}} variant="h4">Current Members</Typography>
                <Stack style={{maxheight:'70%'}} divider={<Divider orientation="horizontal" flexItem />}>
                    {members.map((member) => {
                        return <MemberCard name = {member}/>
                    }
                    ) }
        
                 </Stack>
            </Grid>
            
            <Grid item xs={6}>
            <Typography style={{textAlign:'center'}} variant="h4">Requesting Members</Typography>
                <Stack>
                    <p>hey</p>
                </Stack>
            </Grid>
  
        </Grid>
        </Grid>
      
      
    );
  }
  
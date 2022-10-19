import React from 'react';
import { Container, Stack, Typography, Grid, Divider,Box, Dialog, DialogTitle,DialogContent,DialogContentText } from '@mui/material';
import { useState, useEffect } from 'react';
import MemberCard from './MemberCard1.jsx';
import RequestingMemberCard from './RequestingMemberCard.jsx';
import { margin } from '@mui/system';
import PotentialMemCard from './PotentialMemCard.jsx';

export default function ClubAdminMain() {
    const [members,setMembers] = useState([]);

    const [potentialMembers, setPotentialMembers] = useState([]);
    useEffect(  ()  => {
          const  fetchmembers = async () => {
            const res = await fetch("http://127.0.0.1:5001/club/members");
          const data = await res.json();
        //   console.log(data);
          setMembers(data.members);

        }
        fetchmembers();
      },[] );


      

        useEffect(  ()  => {
            const  fetchpotmembers = async () => {
                const res = await fetch("http://127.0.0.1:5001/club/potentialMembers");
                const data = await res.json();
                setPotentialMembers(data);
                
                // console.log(potentialMembers);
                
              }
      fetchpotmembers();

    }, []);


    const denyMember = ((id) => {
        const  deletePotMem = async () => {
        const response = await fetch("http://127.0.0.1:5001/club/potentialMembers/" + id , {method: 'DELETE'});
        console.log(potentialMembers);
      }
      deletePotMem();
      setPotentialMembers(potentialMembers.filter((mem) => {
        // console.log(mem);
        return mem._id != id;
    }));
});
        
    const acceptMember = ((id) => {
        let student={};
        const getStudent = () => {
            student = {
                userName: "test Name",
                email: "test email",
                clubName: "test club",
                clubEmail: "test club email",
            };
            return student;
        }
        const acceptPotMem = async () => {

            
            fetch('http://localhost:5001/club/potentialMembers', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(student)
            }).then(() => {
    
            }).catch((err) => {
                console.log(err);
            })
    }
    student = getStudent();
    acceptPotMem();
    denyMember(id);
    //have to change members array state
    console.log(members);
});

    return (
       
        <Grid>
        <Typography style={{marginTop:'90px', textAlign:'center'}} variant="h3">Welcome CLUBNAME</Typography>
        
        <Grid container rowSpacing={3} margin={2} padding={3} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
        
            <Grid item xs={6} >
            <Container>
                <Typography style={{textAlign:'center', marginBottom:'20px'}} variant="h4"  >Current Members</Typography>
                </Container>
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
                <Stack spacing={1} style={{width:'400px', textAlign:'center', margin:'0 auto'}} divider={<Divider orientation="horizontal" flexItem />}>
                {potentialMembers.map((member) => {
                        return (
                        <PotentialMemCard  member = {member} onDeny = {denyMember} onAccept={acceptMember}/>

                        );
                    }
                    ) }
                </Stack>

            </div>
            </Grid>
            
        </Grid>
        
        </Grid>


    );
 }

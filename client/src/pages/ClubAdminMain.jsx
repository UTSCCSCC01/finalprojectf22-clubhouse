import React from 'react';
import { Container, Stack, Typography, Grid, Divider,Box, Dialog, DialogTitle,DialogContent,DialogContentText } from '@mui/material';
import { useState, useEffect } from 'react';
import { margin } from '@mui/system';
import PotentialMemCard from './PotentialMemCard.jsx';

/**
 * ClubAdminMain
 * @component
 */
function ClubAdminMain() {
    const [members,setMembers] = useState([]);

    const [potentialMembers, setPotentialMembers] = useState([]);

    /**
   * Fetch and set the members of the club from the database (club-members collection)
   * 
   */
    useEffect(  ()  => {
          const  fetchmembers = async () => {
            const res = await fetch("http://127.0.0.1:5001/club/members");
          const data = await res.json();
          const a=[];
          for (let index = 0; index < data.length; index++) {
             a[index] = data[index].userName;
            
          }
          setMembers(data);
          console.log(data);
          
        } 
        fetchmembers();
      },[] );


      
/**
   * Fetch and set the members applying to the club from the database (clubApplicants/potentialMembers collection)
   * 
   */
        useEffect(  ()  => {
            const  fetchpotmembers = async () => {
                const res = await fetch("http://127.0.0.1:5001/club/potentialMembers");
                const data = await res.json();
                setPotentialMembers(data);
              }
      fetchpotmembers();

    }, []);

      

/**
   * Deletes the denied member according to their id from the potential members database
   * and updates the potential members array
   * @param {string} id - the id of the member to be deleted
   */
    const denyMember = ((id) => {
        const  deletePotMem = async () => {
        const response = await fetch("http://127.0.0.1:5001/club/potentialMembers/" + id , {method: 'DELETE'});
      }
      deletePotMem();
      setPotentialMembers(potentialMembers.filter((mem) => {
        return mem._id != id;
    }));
});

/**
   * Removes the accepted member according to their id from the potential members database and adds them to the members database.
   * And updates the potential members and members array
   * @param {string} id - the id of the member to be deleted
   */
        
    const acceptMember = ((id) => {

        let student={};
        const acceptedMember = potentialMembers.find(mem => mem._id == id)
        const getStudent = () => {
            student = {
                userName: acceptedMember.userName,
                email: acceptedMember.email,
                clubName: acceptedMember.clubName,
                clubEmail: acceptedMember.clubEmail,
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
    setMembers([...members, student]);
   
});


const deleteMember = ((id) => {
    const  deleteMem = async () => {
    const response = await fetch("http://127.0.0.1:5001/club/members/" + id , {method: 'DELETE'});
}
deleteMem();
setMembers(members.filter((mem) => { return mem._id != id; }));
});

    return (
       
        <Grid>
        <Typography style={{marginTop:'90px', textAlign:'center'}} variant="h3">Welcome CLUBNAME</Typography>
        
        <Grid container rowSpacing={3} margin={2} padding={3} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
        
            <Grid item xs={6} >
            <Container>
                <Typography style={{textAlign:'center', marginBottom:'20px'}} variant="h4">Current Members</Typography>
                </Container>
                <div className='cons'>
                <Stack   spacing={1}  style={{width:'300px', textAlign:'center', marginLeft:'22%'}} divider={<Divider orientation="horizontal" flexItem />}>
                    {members.map((member) => {
                        return <PotentialMemCard member = {member} onDeny = {deleteMember} visible = {false} message={"Are you sure you want to remove this member from the club?"}/>
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
                        <PotentialMemCard  member = {member} onDeny = {denyMember} onAccept={acceptMember} visible = {true} message={"Are you sure you want to deny this member from joining the club?"}/>

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

 export default ClubAdminMain;
import React from 'react';
import { Container, Stack, Typography, Grid, Divider, Box, Dialog, DialogTitle, DialogContent, DialogContentText, Paper } from '@mui/material';
import { useState, useEffect } from 'react';
import PotentialMemCard from './PotentialMemCard.jsx';
import { getCookie } from '../libraries/cookieDAO'
/**
 * ClubAdminMain
 * @component
 */
function ClubAdminMain() {
    const [members, setMembers] = useState([]);

    const [potentialMembers, setPotentialMembers] = useState([]);

    const clubName = getCookie("clubName");
    /**
   * Fetch and set the members of the club from the database (club-members collection)
   * 
   */
    useEffect(() => {
        const fetchmembers = async () => {
            console.log(clubName);
            const res = await fetch("http://127.0.0.1:5001/club/members/" + clubName);
            const data = await res.json();
            setMembers(data);
        }
        fetchmembers();
    }, []);



    /**
       * Fetch and set the members applying to the club from the database (clubApplicants/potentialMembers collection)
       * 
       */
    useEffect(() => {
        const fetchpotmembers = async () => {
            const res = await fetch("http://127.0.0.1:5001/club/potentialMembers/" + clubName);
            const data = await res.json();
            setPotentialMembers(data);
            console.log(potentialMembers);
        }
        fetchpotmembers();

    }, []);



    /**
       * Deletes the denied member according to their id from the potential members database
       * and updates the potential members array
       * @param {string} id - the id of the member to be deleted
       */
    const denyMember = ((id) => {
        const deletePotMem = async () => {
            const response = await fetch("http://127.0.0.1:5001/club/potentialMembers/" + id, { method: 'DELETE' });
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

        let student = {};
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
        const deleteMem = async () => {
            const response = await fetch("http://127.0.0.1:5001/club/members/" + id, { method: 'DELETE' });
        }
        deleteMem();
        setMembers(members.filter((mem) => { return mem._id != id; }));
    });

    return (

        <Box mt="120px" mb="40px">
            <Typography style={{ textAlign: 'center' }} variant="h2" gutterBottom>{clubName}</Typography>

            <Box sx={{display: "flex", 
            flexWrap: "wrap", 
            justifyContent: "center"}}>

                <Box width="500px" sx={{m: 2}}>
                    <Container>
                        <Typography style={{ textAlign: 'center', marginBottom: '20px' }} variant="h4">Current Members</Typography>
                    </Container>
                    <Paper elevation={3} sx={{backgroundColor: "#f9f9f9", width: "450px", height: "450px", p: 2, ml: "auto", mr: "auto"}}>
                        <Stack spacing={2} style={{ textAlign: 'center', m: 1}}>
                            {members.map((member) => {
                                return <PotentialMemCard member={member} onDeny={deleteMember} visible={false} message={"Are you sure you want to remove " + member.userName + " from the club?"} />
                            }
                            )}
                        </Stack>
                    </Paper>
                </Box>

                <Box width="500px" sx={{m: 2}}>
                    <Typography style={{ textAlign: 'center', marginBottom: '20px' }} variant="h4">Requesting Members</Typography>
                    <Paper elevation={3} sx={{backgroundColor: "#f9f9f9", width: "450px", height: "450px", p: 2, ml: "auto", mr: "auto"}}>
                        <Stack spacing={2} style={{ textAlign: 'center'}}>
                            {potentialMembers.map((member) => {
                                return (
                                    <PotentialMemCard member={member} onDeny={denyMember} onAccept={acceptMember} visible={true} message={"Are you sure you want to deny " + member.userName + " from joining the club?"} />

                                );
                            }
                            )}
                        </Stack>

                    </Paper>
                </Box>

            </Box>

        </Box>


    );
}

export default ClubAdminMain;
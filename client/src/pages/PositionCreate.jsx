import React, { Component, useEffect } from "react";
import { Typography, Container, makeStyles } from '@material-ui/core/';
import PositionForm from "./PositionForm.jsx";
import Auth from "../components/AuthCheck.jsx";
const useStyles = makeStyles({
  container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: '120px auto 48px auto',
  },
});

/**
* Component for displaying a form to create a new event.
* @component
*/
const PositionCreate = () => {

  const classes = useStyles();
  useEffect( ()  => {
    Auth({student: "/allclubs", nonauth: "/login", admin: "/SCSUClubs"});
  }, []);
  return (
      <Container className={classes.container}>
          <Typography variant="h2" gutterBottom align="center">
              Create a New Job Posting
          </Typography>
          <PositionForm />
      </Container>
  );
}

export default PositionCreate;
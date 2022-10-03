import React from 'react';
import { Button , Container , makeStyles, TextField } from '@material-ui/core/';

const useStyles = makeStyles( {
    field: {
        margin: 10,
        width: 500,
        backgroundColor: "white",
    },

    btn: {
        width: 110,
        height: 45,
    },

    buttons: {
        display: 'flex',
        justifyContent: "space-around",
        width: 500,
    },

    inputs: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    form: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
    }
});

const EventForm = () => {

    const classes = useStyles();

    return (
        <Container className={classes.form}>
            <form className={classes.inputs} noValidate autoComplete='off'>
                <TextField className={classes.field} label="Event Name" size="small" variant="outlined" required/>
                <TextField className={classes.field} label="Location" size="small" variant="outlined" required/>
                <TextField className={classes.field} label="Description" size="small" variant="outlined" required/>
            </form>

            <Container className={classes.buttons}>
                <Button
                    className={classes.btn}
                    onClick={() => console.log("Cancel event creation")}
                    variant="contained" 
                    color="secondary"
                    >Cancel</Button>
                <Button 
                    className={classes.btn}
                    onClick={() => console.log("Event saved")}
                    type="submit" 
                    variant="contained" 
                    color="primary"
                    >Save</Button>
            </Container>
            

        </Container>
    );
}
 
export default EventForm;
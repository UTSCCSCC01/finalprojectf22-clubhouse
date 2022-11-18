import { Container } from "@mui/system";
import EmailSetting from "../components/EmailSetting.jsx";
import React from "react"
import config from  '../../config.json'
import { getCookie } from "../libraries/cookieDAO.js";
import { Typography } from "@mui/material";

class EmailSettingsPage extends React.Component {
    constructor(props) {
        super(props);

        this.generateSettingElement = this.generateSettingElement.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);

        this.state = {clubs: [], checked: {}};
    }

    componentDidMount() {
        // fetch all clubs
        fetch(config.api_url + "club/myclubs/" + getCookie("username")).then(v => v.json()).then(v => {
            let stateobj = {clubs: v};
            for (let i = 0; i < v.length; i++) {
                if ("emailNotifications" in v[i]) {
                    stateobj[v[i].clubName] = v[i].emailNotifications;
                } else {
                    stateobj[v[i].clubName] = true;
                }
            }

            this.setState(stateobj);
        }).catch(r => console.log(r));
    }

    generateSettingElement(clubName, clubEmail) {
        let f = function(event) {
            let body = {
                email: getCookie("username"),
                clubEmail: clubEmail,
                newSetting: event.target.checked
            };

            let fetchOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            }

            fetch(config.api_url + "updateSettings", fetchOptions); // cannot await cause messes with setState
            this.setState({[clubName]: event.target.checked});
            //console.log(clubName + " " + event.target.checked);
        }

        return (
            <EmailSetting checked={this.state[clubName]} onChange={f.bind(this)} clubName={clubName} />
        )
    }

    render() {
        return (
            <Container sx={{mt:2}}>
                <Typography variant="h5" gutterBottom>Email Notifications</Typography>
                {this.state.clubs === [] && <Typography>You are not in any clubs!</Typography> }
                {this.state.clubs.map(v => this.generateSettingElement(v.clubName, v.clubEmail))}
            </Container>
        )
    }
}

export default EmailSettingsPage;
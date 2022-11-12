import { Container } from "@mui/system";
import EmailSetting from "../components/EmailSetting.jsx";
import React from "react"

class EmailSettingsPage extends React.Component {
    constructor(props) {
        super(props);

        this.generateSettingElement = this.generateSettingElement.bind(this);

        this.state = {};
    }

    generateSettingElement(clubName) {
        let f = function(event) {
            this.setState({[clubName]: event.target.checked});
            //console.log(clubName + " " + event.target.checked);
        }

        return (
            <EmailSetting onChange={f.bind(this)}>
                {clubName}
            </EmailSetting>
        )
    }

    render() {
        
        return (
            <Container sx={{marginTop: 10}}>
                {["apples"].map(v => this.generateSettingElement(v))}
            </Container>
        )
    }
}

export default EmailSettingsPage;
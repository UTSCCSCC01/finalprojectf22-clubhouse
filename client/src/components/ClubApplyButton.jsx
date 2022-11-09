
import React from 'react';
import { Button } from '@mui/material';
import { CallMade } from '@mui/icons-material';
import { getCookie } from '../libraries/cookieDAO'
import config from  '../../config.json'

/**
 * A button that applies for a club when clicked, by using the 'applyMember' endpoint
 * @component
 */

class ClubApplyButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: 'Apply',
            disabled: false
        }

        this.applyForClub = this.applyForClub.bind(this);
    }

    render() {
        return (
            <Button sx={{m: 1}} variant='contained' disabled={this.state.disabled} size={this.props.size ? this.props.size : 'medium'} endIcon={<CallMade />} onClick={this.applyForClub}>{this.state.text}</Button>
        )
    }

    /**
     * Click handler for applying
     */
    async applyForClub() {
        const username = getCookie('username');
        const name = getCookie('name');

        const url = config.api_url + "applyMember"
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: username, clubEmail: this.props.clubEmail, name: name, clubName: this.props.clubName}) // Only need email before verification
        };

        const result = await fetch(url, requestOptions);
        let response = await result.json();

        if (!response.success) {
            this.setState({text: response.text, disabled: response.disabled}); // Some user problem
        } else {
            this.setState({text: "Applied", disabled: true});
        }
    }

}

export default ClubApplyButton;
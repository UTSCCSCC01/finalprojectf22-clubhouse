import React from 'react';
import { Menu, MenuItem, Button } from '@mui/material';
import { getCookie } from '../libraries/cookieDAO'
import config from  '../../config.json'
import AnnouncementCard from './AnnouncementCard.jsx';

class NotificationMenu extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
    }

    render() {
        return (
            <Menu {...this.props} open={Boolean(this.props.anchorEl)}>
                {this.props.notifs.map(v => (
                    <AnnouncementCard announcement={v} />
                ))}
            </Menu>
        )
    }
}

export default NotificationMenu;
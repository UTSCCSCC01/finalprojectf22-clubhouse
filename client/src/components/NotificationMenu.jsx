import React from 'react';
import { Menu, Button, Typography } from '@mui/material';
import AnnouncementCard from './AnnouncementCard.jsx';

/**
 * Notification menu
 * @component
 */

class NotificationMenu extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
    }

    render() {
        return (
            <Menu width="100%" {...this.props} open={Boolean(this.props.anchorEl)}>
                {this.props.notifs.length === 0 ? <Typography m={1.5}>No notifications</Typography>
                : this.props.notifs.map(v => (
                    <AnnouncementCard announcement={v} />
                ))}
                {/* <Button sx={{width: "100%"}}>
                    Unregister from emails
                </Button> */}
            </Menu>
        )
    }
}

export default NotificationMenu;
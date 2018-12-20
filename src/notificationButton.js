import React from 'react';
import { askForPermissionToReceiveNotifications } from './push-notifications.js';

const NotificationButton = () => (
    <button onClick={askForPermissionToReceiveNotifications} >
      Click here to receive notifications
    </button>
);
export default NotificationButton;
const toBool = value => value ? value.toLowerCase() === 'true'  :false;

const config = {
    notificationsEnabled: toBool(process.env.REACT_APP_NOTIFICATIONS_ENABLED)
};

export default config;
import React from 'react';
import { Redirect } from 'react-router-dom';

import authentication from 'react-azure-adb2c';

const TARGET_URL = 'targetUrl';

export const requiresLogin = (WrappedComponent) => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                targetUrl: props.location.pathname
            };
        }

        render() {
            const { targetUrl } = this.state;

            if (authentication.getAccessToken()) {
                return (<WrappedComponent {...this.props}/>);
            }

            sessionStorage.setItem(TARGET_URL, targetUrl);
            return <Redirect to='/login' />
        }
    }
};

export const Login = () => {
    const targetUrl = sessionStorage.getItem(TARGET_URL);
    return <Redirect to={targetUrl} />;
}

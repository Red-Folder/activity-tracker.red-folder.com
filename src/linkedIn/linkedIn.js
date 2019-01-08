import React from 'react';
import { Route, Switch } from 'react-router-dom';
import queryString from 'query-string';

const redirectToLinkedIn = () => {
    const targetUrl = 'https://www.linkedin.com/oauth/v2/authorization?' +
        'response_type=code&' +
        'client_id=' + process.env.REACT_APP_LINKEDIN_CLIENT_ID + '&' +
        'state=todo&' +
        'scope=w_share&' +
        'redirect_uri=http://localhost:3000/linkedin/auth/callback';

    window.location = targetUrl;
    return null;
}

const authCallback = (props) => {
    const parameters = queryString.parse(props.location.search);

    if (parameters.code) {
        const code = parameters.code;
        const state = parameters.state;
    
        return <div>{code}</div>;
    }

    const error = parameters.error;
    const error_description = parameters.error_description;
    return (
    <div>
        <h1>An error has occurred</h1>
        <p>Error Code: {error}</p>
        <p>{error_description}</p>
    </div>);
}

const LinkedIn = () =>
    <div>
        <Switch>
            <Route path="*/auth/callback" component={authCallback} />
            <Route component={redirectToLinkedIn} />
        </Switch>
    </div>;


export default LinkedIn;


// See https://tylermcginnis.com/react-router-protected-routes-authentication/ for privateroutes
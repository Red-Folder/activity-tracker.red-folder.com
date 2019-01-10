import React from 'react';
import { Route, Switch } from 'react-router-dom';
import queryString from 'query-string';

const redirectUri = 'http://localhost:3000/linkedin/auth/callback';

const redirectToLinkedIn = () => {
    const targetUrl = 'https://www.linkedin.com/oauth/v2/authorization?' +
        'response_type=code&' +
        `client_id=${process.env.REACT_APP_LINKEDIN_CLIENT_ID}&` +
        'state=todo&' +
        'scope=w_share&' +
        `redirect_uri=${redirectUri}`;

    window.location = targetUrl;
    return null;
}

const authCallback = (props) => {
    const parameters = queryString.parse(props.location.search);

    if (parameters.code) {
        const code = parameters.code;
        const state = parameters.state;

        requestAccessToken(code, redirectUri)
            .then(data => console.log(data));

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

const requestAccessToken = (code) => {
    var payload = {
        code: code,
        redirectUri: redirectUri
    };
    const options = {
        method: 'POST',
        body: JSON.stringify(payload)
    };

    return fetch("http://localhost:7071/api/RequestLinkedInAccessToken", options)
        .then(res => {
            return res.json();
        });
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
import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';
import AuthCallback from './authCallback.js';
import { retrieveAccessToken } from './accessTokenRepository.js';

const redirectAfterAuthenticationUri = 'http://localhost:3000/linkedin/auth/callback';

const redirectToLinkedIn = (props) => {
    const parameters = queryString.parse(props.location.search);
    const targetUrl = parameters.targetUrl;
    const redirectTo = 'https://www.linkedin.com/oauth/v2/authorization?' +
        'response_type=code&' +
        `client_id=${process.env.REACT_APP_LINKEDIN_CLIENT_ID}&` +
        `state=${targetUrl}&` +
        'scope=w_member_social&' +
        `redirect_uri=${redirectAfterAuthenticationUri}`;

    window.location = redirectTo;
    return null;
}

/*
const authCallback = (props) => {
    console.log("Called");
    const parameters = queryString.parse(props.location.search);
    const [hasAccessToken, receivedAccessToken] = useState(false);

    if (parameters.code) {
        const code = parameters.code;
        const originalTargetUrl = decodeURI(parameters.state);

        requestAccessToken(code, redirectAfterAuthenticationUri)
            .then(data => {
                saveAccessToken(data);
                receivedAccessToken(true);
            });

        return (
            <div>
                <div>{code}</div>
                <div>{originalTargetUrl}</div>
                {hasAccessToken && <Redirect to={originalTargetUrl} />}
            </div>
        );
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
*/

const share = (props) => {
    const data = retrieveAccessToken(null);

    debugger;
    if (data && data.accessToken) {

        /*
        testShare(data.accessToken)
            .then(() => console.log("Share should have been made"));
        */

        return (
            <div>
                <div>Sharing ...</div>
                <p>data</p>
            </div>
        );
    }
    
    const originalTarget = encodeURI(props.location.pathname);
    const redirectUrl = `/linkedin?targetUrl=${originalTarget}`;
    return <Redirect to={redirectUrl} />
}

/*
const requestAccessToken = (code) => {
    var payload = {
        code: code,
        redirectUri: redirectAfterAuthenticationUri
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
*/

const testShare = (accessToken) => {
    var payload = {
        accessToken: accessToken
    };
    const options = {
        method: 'POST',
        body: JSON.stringify(payload)
    };

    return fetch("http://localhost:7071/api/LinkedInTestPost", options);
}

const LinkedIn = () =>
    <div>
        <Switch>
            <Route path="*/auth/callback" component={AuthCallback} />
            <Route path="*/share" component={share} />
            <Route path="*" component={redirectToLinkedIn} />
        </Switch>
    </div>;


export default LinkedIn;


// See https://tylermcginnis.com/react-router-protected-routes-authentication/ for privateroutes
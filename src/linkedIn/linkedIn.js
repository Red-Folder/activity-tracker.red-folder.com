import React, { useEffect } from 'react';
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
        //'scope=r_liteprofile&' +
        //'scope=r_basicprofile&' +
        'scope=r_liteprofile w_member_social&' +
        `redirect_uri=${redirectAfterAuthenticationUri}`;

    window.location = redirectTo;
    return null;
}

const share = (props) => {
    const data = retrieveAccessToken(null);

    const postShare = async (data) => {
        if (data && data.accessToken) {
            //var response = await testShare(data.accessToken);
            //console.log(response);
            console.log(data.accessToken);
            console.log("Will Share");
        }
    };

    useEffect(() => {
        postShare(data);
    }, [data]);

    const originalTarget = encodeURI(props.location.pathname);
    const redirectUrl = `/linkedin?targetUrl=${originalTarget}`;
    return (
        <div>
            { 
                data && data.accessToken &&
                <div>
                    <div>Sharing ...</div>
                    <p>data</p>
                </div>
            }
            {
                !(data && data.accessToken) &&
                <Redirect to={redirectUrl} />
            }
        </div>
    );
}

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
import React from 'react';
import { Redirect } from 'react-router-dom';

const LinkedIn = () => {
    const targetUrl = 'https://www.linkedin.com/oauth/v2/authorization?' +
                      'response_type=code&' +
                      'client_id=' + process.env.REACT_APP_LINKEDIN_CLIENT_ID + '&' +
                      'state=todo&' +
                      'scope=w_share&' +
                      'redirect_uri=http://localhost:3000/linkedin/auth/callback';

    window.location = targetUrl;
    return null;
}

export default LinkedIn;

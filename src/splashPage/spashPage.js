import React from 'react';
import RfcLogo from '../rfcLogo/rfcLogo.js';

import './splashPage.css';

const SplashPage = () => (
    <div id='splash-page'>
        <RfcLogo />
        <h1>RFC Activity Approval</h1>
        <p>
            This is a private system intended for use by Red Folder Consultancy Ltd staff only.
        </p>
        <p>
            Those with authorised credentials should use the login button below.
        </p>
        <div>
            <a className='btn btn-primary' href='/awaiting-approval'>Login</a>
        </div>
    </div>
);
export default SplashPage;
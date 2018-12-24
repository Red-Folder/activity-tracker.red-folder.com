import React from 'react';

import './rfcLogo.css';

import logo from './rfc-folder-logo.png';

const RfcLogo = () => (
    <div>
        <img id='rfc-logo' src={logo} alt="RFC Logo" class="img-circle" />
    </div>
);
export default RfcLogo;
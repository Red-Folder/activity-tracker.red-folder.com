import React from 'react';
import AwaitingApprovalList from '../awaitingApprovalList/awaitingApprovalList.js';

import './awaitingApprovalPage.css';

const AwaitingApprovalPage = () => (
    <div id='awaiting-approval-page'>
        <h1>Awaiting Approvals</h1>
        <AwaitingApprovalList/>
    </div>
);
export default AwaitingApprovalPage;
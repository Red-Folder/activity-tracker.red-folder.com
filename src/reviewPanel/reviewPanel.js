import React from 'react';

import { getByEventNameAndInstanceId, approve, decline } from '../resources/awaitingApprovals.js';

const handleApprove = (eventName, instanceId) => {
    approve(eventName, instanceId).then(() => redirectToAwaitingApprovals());
}

const handleDecline = (eventName, instanceId) => {
    decline(eventName, instanceId).then(() => redirectToAwaitingApprovals());
}

const redirectToAwaitingApprovals = () => {
    window.location = '/awaiting-approval';
}

const ReviewPanel = (props) => {
    const eventName = props.eventName;
    const instanceId = props.instanceId;
    const data = getByEventNameAndInstanceId(eventName, instanceId);

    if (data) {
        return (
            <div>
                <h1>Approve activity for week no: {data.weekNumber}</h1>
                <div>
                    <img src={data.imageUrl} alt={'Image for' + data.weekNumber} className='img-responsive' />
                </div>
                <div>
                    <button onClick={() => handleApprove(eventName, instanceId)} className='btn btn-primary'>Approve</button>
                    <button onClick={() => handleDecline(eventName, instanceId)} className='btn btn-primary'>Decline</button>
                    <a href='/awaiting-approval' className='btn btn-primary'>Return</a>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h1>Not found</h1>
            <p>Unable to find {eventName}/ {instanceId}</p>
            <div>
                <a className='btn btn-primary' href='/awaiting-approval'>Return</a>
            </div>
        </div>);
};

export default ReviewPanel;
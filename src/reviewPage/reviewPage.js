import React from 'react';

import './reviewPage.css';

const ReviewPage = (props) => {
    console.log(JSON.stringify(props));
    const eventName = props.match.params.eventName;
    const instanceId = props.match.params.instanceId;

    return (
        <div id='review-page'>
            <h1>{eventName} - {instanceId}</h1>
        </div>);
};

export default ReviewPage;
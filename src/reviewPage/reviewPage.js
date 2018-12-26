import React from 'react';
import ReviewPanel from '../reviewPanel/reviewPanel.js';

import './reviewPage.css';

const ReviewPage = (props) => {
    const eventName = props.match.params.eventName;
    const instanceId = props.match.params.instanceId;

    return (
        <React.Suspense fallback={<div>loading data...</div>}>
            <div id='review-page'>
                <ReviewPanel eventName={eventName} instanceId={instanceId} />
            </div>
        </React.Suspense>
    );
};

export default ReviewPage;
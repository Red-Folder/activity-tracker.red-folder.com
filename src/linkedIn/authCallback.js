import React from "react";
import { Route } from 'react-router-dom';
import queryString from 'query-string';

const noParameters = parameters => !parameters;
const neitherErrorOrCode = parameters => !(parameters.error || parameters.code);
const missingCode = parameters => (parameters.state && !parameters.code);
const missingState = parameters => (parameters.code && !parameters.state);

const invalidParameters = parameters => {
    return noParameters(parameters) ||
        neitherErrorOrCode(parameters) ||
        missingCode(parameters) ||
        missingState(parameters);
}

const validateForMissingParameters = next => parameters => {
    if (invalidParameters(parameters)) {
        return {
            error: true,
            errorHeader: 'An error receiving parameters fron LinkedIn has occurred',
            errorDescription: 'Would expect parameters as specificied in https://docs.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?context=linkedin/consumer/context#step-2-request-an-authorization-code'
        }
    }

    if (next) {
        return next(parameters);
    }

    return undefined;
}

const validateUserDidNotCancelLogin = next => parameters => {
    if (parameters.error && parameters.error === 'user_cancelled_login') {
        return {
            error: true,
            errorHeader: 'Authentication cancelled due to user login cancellation',
            errorDescription: parameters.error_description
        }
    }

    if (next) {
        return next(parameters);
    }

    return undefined;
}

const validateUserAuthorisedApp = next => parameters => {
    if (parameters.error && parameters.error === 'user_cancelled_authorize') {
        return {
            error: true,
            errorHeader: 'Authorisation not given by user',
            errorDescription: parameters.error_description
        }
    }

    if (next) {
        return next(parameters);
    }

    return undefined;
}

const parseValidParameters = parameters => {
    return {
        error: false,
        code: parameters.code,
        redirectUri: decodeURI(parameters.state)
    };
}

const parseResponse = (parameters) => {
    const step3 = validateUserAuthorisedApp(parseValidParameters);
    const step2 = validateUserDidNotCancelLogin(step3);
    const step1 = validateForMissingParameters(step2);
    const result = step1(parameters);

    if (result) {
        return result;       
    }

    return {
        error: true,
        errorHeader: 'Unexpected error occurred',
        errorDescription: 'An unexpected error has occurred.'
    };
}

const AuthCallback = (props) => {
    const parameters = props.location && props.location.search ? queryString.parse(props.location.search): undefined;
    const linkedInResponse = parseResponse(parameters);

    //console.log(linkedInResponse);

    /*
                requestAccessToken(code, redirectUri)
                    .then(data => console.log(data));

                return <div>{code}</div>;
    */

    if (!linkedInResponse.error) {
        requestAccessToken(linkedInResponse.code, linkedInResponse.redirectUri)
                    .then(data => console.log(data));
    }

    return (
        <div>
            {
                !linkedInResponse.error &&
                <div>
                </div>
            }
            {
                linkedInResponse.error &&
                <div>
                    <h2>{linkedInResponse.errorHeader}</h2>
                    <p>{linkedInResponse.errorDescription}</p>
                </div>
            }
        </div>
    );
}

const requestAccessToken = (code, redirectUri) => {
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

export default AuthCallback;
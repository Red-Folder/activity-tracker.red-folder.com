const accessTokenSessionKey = 'LINKEDIN-ACCESS-TOKEN';

export const saveAccessToken = (data) => {
    debugger;
    sessionStorage.setItem(accessTokenSessionKey, JSON.stringify(data));
}

export const retrieveAccessToken = (defaultData) => {
    const json = sessionStorage.getItem(accessTokenSessionKey);

    debugger;
    return json ? JSON.parse(json) : defaultData;
}

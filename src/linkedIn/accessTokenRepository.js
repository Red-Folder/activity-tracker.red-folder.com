const accessTokenSessionKey = 'LINKEDIN-ACCESS-TOKEN';

export const saveAccessToken = (data) => {
    sessionStorage.setItem(accessTokenSessionKey, JSON.stringify(data));
}

export const retrieveAccessToken = (defaultData) => {
    const json = sessionStorage.getItem(accessTokenSessionKey);
    return json ? JSON.parse(json) : defaultData;
}

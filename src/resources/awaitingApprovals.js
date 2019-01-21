import authentication from 'react-azure-adb2c';

const pendingApprovalsFetch = () => {
  const headers = new Headers({ 'Authorization': `Bearer ${authentication.getAccessToken()}` });
  const options = {
    headers
  };

  return fetch("https://rfc-activity.azurewebsites.net/api/GetPendingApprovals", options)
    .then(res => {
      return res.json();
    });
}

export const getAll = () => {
  return pendingApprovalsFetch();
}

export const getByEventNameAndInstanceId = (eventName, instanceId) => {
  return getAll()
          .then(all => {
            const matches = all.filter(x => x.eventName === eventName && x.instanceId === instanceId);
            if (matches) {
              return matches[0];
            }
          
            return null;
          });
}

export const approve = (eventName, instanceId) => updateApproval(eventName, instanceId, true);
export const decline = (eventName, instanceId) => updateApproval(eventName, instanceId, false);

const updateApproval = (eventName, instanceId, approved) => {
  const headers = new Headers({
    Authorization: `Bearer ${authentication.getAccessToken()}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });
  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify({
      eventName,
      instanceId,
      approved
    })
  };

  return fetch("https://rfc-activity.azurewebsites.net/api/approve", options);
}
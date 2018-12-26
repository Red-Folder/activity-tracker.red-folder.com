import { unstable_createResource as createResource } from "react-cache";

import authentication from 'react-azure-adb2c';

const awaitingApprovalsResource = createResource(() => {
  const headers = new Headers({ Authorization: `Bearer ${authentication.getAccessToken()}` });
  const options = {
    headers
  };

  return fetch("https://rfc-activity.azurewebsites.net/api/GetPendingApprovals", options)
    .then(res => {
      return res.json();
    });
});

export const getAll = () => {
  return awaitingApprovalsResource.read();
}

export const getByEventNameAndInstanceId = (eventName, instanceId) => {
  const all = getAll();
  const matches = all.filter(x => x.eventName === eventName && x.instanceId === instanceId);

  if (matches) {
    return matches[0];
  }

  return null;
}


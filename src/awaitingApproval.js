import React from 'react';
import { createCache, createResource } from "react-cache";

import authentication from 'react-azure-adb2c';

let cache = createCache();

let AwaitingApprovalResource = createResource(() => {
  const headers = new Headers({ Authorization: `Bearer ${authentication.getAccessToken()}` });
  const options = {
    headers
  };

  return fetch("https://rfc-activity.azurewebsites.net/api/GetPendingApprovals", options)
        .then(res => res.json())
});

function AwaitingApprovalItem({ className, component: Component = "li", ...props }) {
  return (
    <Component
      className={["awaiting-approval-list-item", className].join(" ")}
      {...props}
    />
  );
}

function AwaitingApprovalList() {
  return (
    <ul>
      {AwaitingApprovalResource.read(cache).results.map(pokemon => (
        <AwaitingApprovalItem key={pokemon.name}>{pokemon.name}</AwaitingApprovalItem>
      ))}
    </ul>
  );
}

const AwaitingApproval = () => (
    <React.Suspense fallback={<div>loading Pokemon...</div>}>
        <AwaitingApprovalList />
    </React.Suspense>
);
export default AwaitingApproval;
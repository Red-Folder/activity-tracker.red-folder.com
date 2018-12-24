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
    .then(res => {
      return res.json();
    });
});

function AwaitingApprovalRow({key, item}) {
  const { eventName, instanceId, weekNo, from, to } = item;
  const reviewUrl = `/approve/${eventName}/${instanceId}`;
  return (
    <tr>
      <td>{instanceId}</td>
      <td>{weekNo}</td>
      <td>{from}</td>
      <td>{to}</td>
      <td>
        <a href={reviewUrl} className='btn btn-primary'>Review</a>
      </td>
    </tr>
  );
}

function AwaitingApprovalTable() {
  const list = AwaitingApprovalResource.read(cache);

  if (list && list.length > 0) {
    return (
      <table className="table">
        <tbody>
          <tr>
            <th>ID</th>
            <th>Week No</th>
            <th>From</th>
            <th>To</th>
            <th></th>
          </tr>

          {list.map(item => (
            <AwaitingApprovalRow key={item.instanceId}
              item={item} />
          ))}

        </tbody>
      </table>
    );
  }

  return (
    <p>No records awaiting approval</p>
  );
}

const AwaitingApprovalList = () => (
  <React.Suspense fallback={<div>loading data...</div>}>
    <AwaitingApprovalTable />
  </React.Suspense>
);

export default AwaitingApprovalList;
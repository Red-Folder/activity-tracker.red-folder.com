import React, { useState, useEffect } from 'react';

import { getAll } from '../resources/awaitingApprovals.js';

const AwaitingApprovalRow = ({item}) => {
  const { eventName, instanceId, weekNumber, from, to } = item;
  const reviewUrl = `/approve/${eventName}/${instanceId}`;
  return (
    <tr>
      <td>{instanceId}</td>
      <td>{weekNumber}</td>
      <td>{from}</td>
      <td>{to}</td>
      <td>
        <a href={reviewUrl} className='btn btn-primary'>Review</a>
      </td>
    </tr>
  );
}

const AwaitingApprovalTable = () => {
  const [list, setList] = useState(null);

  const fetchData = async () => {
    const data = await getAll();

    setList(data);
  };

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <div>
      {
        !list &&
        <p>Loading</p>
      }
      {
        list && list.length === 0 &&
        <p>No records awaiting approval</p>
      }
      {
        list && list.length > 0 &&
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
              <AwaitingApprovalRow key={item.instanceId} item={item} />
            ))}

          </tbody>
        </table>
      }
    </div>
  );
}

const AwaitingApprovalList = () => (
  <div>
    <AwaitingApprovalTable />
  </div>
);

export default AwaitingApprovalList;
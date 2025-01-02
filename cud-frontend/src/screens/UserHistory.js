import React, { useContext } from 'react';
import customerContext from '../context/CustomerContext';
import CustomerItem from '../components/CustomerItem';

const UserHistory = () => {
  const customerCtx = useContext(customerContext);
  const { allCustomers } = customerCtx;

  return (
    <div className="container mx-auto p-4 bg-gray-100 shadow-lg rounded-md">
      <h1 className="text-xl font-bold text-center text-gray-800 mb-6">Customer History</h1>
      <div className="grid grid-cols-4 bg-gray-300 py-2 px-4 rounded-t-lg">
        <p className="text-center font-semibold text-gray-700 text-lg">Name</p>
        <p className="text-center font-semibold text-gray-700 text-lg">Father Name</p>
        <p className="text-center font-semibold text-gray-700 text-lg">Village</p>
        <p className="text-center font-semibold text-gray-700 text-lg">Mobile Number</p>
      </div>
      <div className="divide-y divide-gray-300">
        {allCustomers.map((customerObj, index) => (
          <CustomerItem key={index} customer={customerObj} />
        ))}
      </div>
    </div>
  );
};

export default UserHistory;

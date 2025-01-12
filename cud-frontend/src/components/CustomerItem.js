import React, { useContext } from 'react';
import cartContext from '../context/CartContext';

const CustomerItem = ({ customer }) => {
  const cartCtx = useContext(cartContext);
  const {getAllOrdersOfCustomer} = cartCtx;
  const handleClick = () =>{
    getAllOrdersOfCustomer(customer._id);
  }
  return (
    <div className="grid grid-cols-4 items-center py-2 px-4 hover:bg-gray-200 transition-colors cursor-pointer" onClick={handleClick}>
      <p className="text-center text-gray-700">{customer.name}</p>
      <p className="text-center text-gray-700">{customer.fatherName}</p>
      <p className="text-center text-gray-700">{customer.village}</p>
      <p className="text-center text-gray-700">{customer.mobile}</p>
    </div>
  );
};

export default CustomerItem;

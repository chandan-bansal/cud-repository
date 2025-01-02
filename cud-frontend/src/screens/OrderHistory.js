import React, { useContext, useEffect } from "react";
import cartContext from "../context/CartContext";
import OrderItem from "../components/OrderItem";
import { useLocation, useParams } from "react-router-dom";

const OrderHistory = () => {
  const cartCtx = useContext(cartContext);
  const { allPrevOrders, customerOrders,getAllOrdersOfCustomer } = cartCtx;
  const {id} = useParams() 
  useEffect(()=>{
    getAllOrdersOfCustomer(id);
  },[])
  const location = useLocation();
  let data = customerOrders
  if(location.pathname === "/orderHistory"){
    data = allPrevOrders
  }

  console.log("data", data)
  return (
    <div className="p-6 m-6 bg-gray-50 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-900 border-b pb-2">
        Order History
      </h2>

      <div className="grid grid-cols-4 gap-4 bg-gray-200 p-4 rounded-lg mb-6">
        <p className="text-gray-800 font-bold">Order Id</p>
        <p className="text-gray-800 font-bold">Customer Name</p>
        <p className="text-gray-800 font-bold">Total Price</p>       
        <p className="text-gray-800 font-bold">Date</p>

      </div>

      <div>
        {data.length > 0 ? (
          data.map((orderItem) => (
            <OrderItem key={orderItem.order_id} order={orderItem} />
          ))
        ) : (
          <p className="text-center text-gray-700 font-medium">
            No previous orders found.
          </p>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;

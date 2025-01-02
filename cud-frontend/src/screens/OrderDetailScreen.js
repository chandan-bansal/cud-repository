import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import cartContext from "../context/CartContext";
import ProductCart from "../components/ProductCart";
import FodderCart from "../components/FodderCart";

const OrderDetailScreen = () => {
  const ctx = useContext(cartContext);
  const { allPrevOrders,getAllPreviousOrders } = ctx;
  let orderDetails = {};
  let order={};
  const { customer_id, order_id } = useParams();
  for (const obj in allPrevOrders) {
    if (allPrevOrders[obj]?.order_id == order_id) {
        order = allPrevOrders[obj];
      orderDetails = allPrevOrders[obj]?.order_details;
      break;
    }
  }
  console.log("Order in orderdetailscreen", order)
  const handleClick = () => {
    // saveOrderInCart();
    console.log("Handle Click");
  };

  return (
    <div className="p-6 m-6 bg-gray-50 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-900">
        {`Order Id: ${order.order_id}`}
      </h2>
      <p className="border-b pb-2">{`${order?.customer?.name}`}</p>
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Product Items
        </h3>
        <ProductCart items={orderDetails["productInCart"]} />
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Fodder Items
        </h3>
        <FodderCart order={order} items={orderDetails? orderDetails.fodderInCart: {}} />
      </div>

      <div className="flex justify-between items-center border-t pt-4">
        <p className="text-lg font-medium text-gray-700">
          Total Sum:
          <span className="text-gray-900 font-semibold ml-2">
            {`⟨₹⟩${orderDetails["totalCartSum"]}`}
          </span>
        </p>
        <button
          onClick={handleClick}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-200"
        >
          Save Order
        </button>
      </div>
    </div>
  );
};

export default OrderDetailScreen;

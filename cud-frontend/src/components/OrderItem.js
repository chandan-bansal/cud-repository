import React from "react";
import { useNavigate } from "react-router-dom";

const OrderItem = (props) => {
  const { order } = props;
  const dateStr = order["order_details"]["createdOn"];
  const navigate = useNavigate();
  let formattedDate = ""
  if (dateStr) {
    const dateObj = new Date(dateStr);
    // Format using Intl.DateTimeFormat
    const options = { day: "2-digit", month: "long", year: "numeric" };
    formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      dateObj
    );
  }

  const handleClick = () => {
    if (order?.customer_id && order?.order_id) {
      navigate(`/orders/${order["customer_id"]}/${order["order_id"]}`);
    } else {
        console.error("Invalid order data");
    }
};
  return (
    <div className="grid grid-cols-4 gap-4 bg-white p-4 rounded-lg shadow-md mb-4 hover:bg-gray-100 transition cursor-pointer" onClick={handleClick}>
      <p className="text-gray-700 font-medium">{order["order_id"]}</p>
      <p className="text-gray-700">{order["customer"]["name"]}</p>
      <p className="text-gray-700 font-semibold">
      ⟨₹⟩{order["order_details"]["totalCartSum"]}
      </p>
      <p className="text-gray-700">{formattedDate}</p>
    </div>
  );
};

export default OrderItem;

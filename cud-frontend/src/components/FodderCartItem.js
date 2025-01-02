import React, { useContext } from "react";
import cartContext from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const FodderCartItem = (props) => {
    const cartCtx = useContext(cartContext)
    const {deleteFodderFromCart, allPrevOrders} = cartCtx;
  const { id, orderDetails, order } = props;
  console.log("Order_id", order.order_id)
  console.log("Order", order)
  const navigate = useNavigate();
    const editFodder = () =>{

    }

    const handleClick = () =>{
      console.log(`/orders/${order.customer_id}/${order.order_id}/fodder/${id}/details`)
      navigate(`/orders/${order.customer_id}/${order.order_id}/fodder/${id}/details`)
    }
    const deleteFodder = () =>{
        deleteFodderFromCart(id);
    }
  return (
    <div className="grid grid-cols-4 gap-4 items-center justify-center p-2 border-b border-gray-200 cursor-pointer" onClick={handleClick}>
      <p className="text-center text-gray-600">{`Fodder: ${id}`}</p>
      <p className="text-center text-gray-600">{orderDetails.totalWeight} kg</p>
      <p className="text-center text-gray-600">⟨₹⟩{orderDetails.totalSum}</p>
      <div className="flex justify-center space-x-4">
        {/* <button className="text-blue-500 hover:text-blue-700" onClick={editFodder}>
          <i className="material-icons" style={{ fontSize: 24 }}>
            edit
          </i>
        </button> */}
        <button className="text-red-500 hover:text-red-700" onClick={deleteFodder}>
          <i className="material-icons" style={{ fontSize: 24 }}>
            delete
          </i>
        </button>
      </div>
    </div>
  );
};

export default FodderCartItem;

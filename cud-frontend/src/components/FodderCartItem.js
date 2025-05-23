import React, { useContext } from "react";
import cartContext from "../context/CartContext";
import { useLocation, useNavigate } from "react-router-dom";

const FodderCartItem = (props) => {
    const cartCtx = useContext(cartContext)
    const {deleteFodderFromCart, allPrevOrders} = cartCtx;
  const { id, orderDetails, order } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;
  
    const editFodder = () =>{

    }

    const handleClick = () =>{
      if(pathName == "/cart"){
        navigate(`/cart/fodder/${id}/details`);
      }
      else{
        navigate(`/orders/${order.customer_id}/${order.order_id}/fodder/${id}/details`)
      }
    }
    const deleteFodder = () =>{
        deleteFodderFromCart(id);
    }
  return (
    <div className="grid grid-cols-4 gap-4 items-center justify-center p-2 border-b border-gray-200 cursor-pointer">
      <p className="text-center text-gray-600 hover:text-blue-500" onClick={handleClick}>{`Fodder: ${id}`}</p>
      <p className="text-center text-gray-600">{orderDetails.totalWeight} kg</p>
      <p className="text-center text-gray-600">⟨₹⟩{orderDetails.totalSum}</p>
      <div className="flex justify-center space-x-4">
        {!pathName.includes("orders") && <button className="text-red-500 hover:text-red-700" onClick={deleteFodder}>
          <i className="material-icons" style={{ fontSize: 24 }}>
            delete
          </i>
        </button>}
      </div>
    </div>
  );
};

export default FodderCartItem;

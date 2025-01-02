import React, { useContext } from "react";
import cartContext from "../context/CartContext";
import { useParams } from "react-router-dom";
import FodderIngredient from "../components/FodderIngredient";
import CustomerOrderScreenItem from "../components/CustomerOrderScreenItem";

const CustomerOrderScreen = () => {
  const cartCtx = useContext(cartContext);
  const { getOrder } = cartCtx;
  const { customer_id, order_id, fodder_id } = useParams();
  const targetOrder = getOrder(order_id);
  const targetFodder = targetOrder?.[0]?.order_details?.fodderInCart;
  let fodderComp = targetFodder?.[fodder_id]?.["order"];
  fodderComp = fodderComp?fodderComp:{};
  console.log(fodderComp);
  return (
    <div className="p-8 bg-gray-50 rounded-xl shadow-xl max-w-5xl mx-auto mt-8">
      {/* Header */}
      <div className="grid grid-cols-4 gap-6 items-center justify-center py-5 bg-gray-200 rounded-t-xl">
        <p className="text-center font-semibold text-gray-700 text-lg">
          Ingredients
        </p>
        <p className="text-center font-semibold text-gray-700 text-lg">Price</p>
        <p className="text-center font-semibold text-gray-700 text-lg">
          Quantity (in Kgs)
        </p>
        <p className="text-center font-semibold text-gray-700 text-lg">Total</p>
      </div>

      {/* Ingredients Rows */}
      <div className="bg-white rounded-b-xl">
        {Object.entries(fodderComp).map(([key, value]) => (
          <CustomerOrderScreenItem key={key} id={key} ingredient={value} />
        ))}
      </div>

      {/* Total Sum */}
      <div className=" flex mt-6 p-4 bg-gray-100 rounded-lg shadow-md text-right justify-between">
        <p className="text-xl font-semibold text-gray-800">
          Total Weight(in kgs):{" "}
          <span className="text-green-600">{targetFodder?.[fodder_id]?.totalWeight}</span>
        </p>
        <p className="text-xl font-semibold text-gray-800">
          Total Sum: <span className="text-green-600">{targetFodder?.[fodder_id]?.totalSum}</span>
        </p>
        <button
          className="text-xl font-bold text-white bg-green-600 p-2 rounded-lg"
        //   onClick={addToCart}
        >
          Use this formula
        </button>
        
      </div>
    </div>
  );
};

export default CustomerOrderScreen;

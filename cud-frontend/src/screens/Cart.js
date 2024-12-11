import React, { useContext } from "react";
import FodderCart from "../components/FodderCart";
import ProductCart from "../components/ProductCart";
import cartContext from "../context/CartContext";

const Cart = () => {
  const ctx = useContext(cartContext);
  const { cartObject } = ctx;

  return (
    <div className="p-6 m-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Cart</h2>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Product Items</h3>
        <ProductCart items={cartObject["productInCart"]} />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Fodder Items</h3>
        <FodderCart items={cartObject["fodderInCart"]} />
      </div>
    </div>
  );
};

export default Cart;

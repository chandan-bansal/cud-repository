import React, { useContext } from "react";
import FodderCart from "../components/FodderCart";
import ProductCart from "../components/ProductCart";
import cartContext from "../context/CartContext";

const Cart = () => {
  const ctx = useContext(cartContext);
  const { cartObject, saveOrderInCart } = ctx;

  const handleSaveOrderClick = () => {
    saveOrderInCart();
  };

  return (
    <div className="p-6 m-6 bg-gray-50 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-900 border-b pb-2">
        Your Shopping Cart
      </h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Product Items</h3>
        <ProductCart items={cartObject["productInCart"]} />
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Fodder Items</h3>
        <FodderCart items={cartObject["fodderInCart"]} />
      </div>

      <div className="flex justify-between items-center border-t pt-4">
        <p className="text-lg font-medium text-gray-700">
          Total Sum: 
          <span className="text-gray-900 font-semibold ml-2">
            {`⟨₹⟩${cartObject["totalCartSum"]}`}
          </span>
        </p>
        <button
          onClick={handleSaveOrderClick}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-200"
        >
          Save Order
        </button>
      </div>
    </div>
  );
};

export default Cart;

import React, { useContext } from "react";
import FodderIngredient from "../components/FodderIngredient";
import orderContext from "../context/OrderContext";

const EditFodder = () => {
  const orderCtx = useContext(orderContext);
  const { totalObject, resetValues, orderMap, addToCart } = orderCtx;
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
        {Array.from(orderMap.entries()).map(([key, value]) => (
          <FodderIngredient key={key} id={key} ingredient={value} />
        ))}
      </div>

      {/* Total Sum */}
      <div className=" flex mt-6 p-4 bg-gray-100 rounded-lg shadow-md text-right justify-between">
        <p className="text-xl font-semibold text-gray-800">
          Total Weight(in kgs):{" "}
          <span className="text-green-600">{totalObject.weight}</span>
        </p>
        <p className="text-xl font-semibold text-gray-800">
          Total Sum: <span className="text-green-600">{totalObject.sum}</span>
        </p>
        <button className="text-xl font-bold text-white bg-green-600 p-2 rounded-lg"
        onClick={addToCart}>
          Save
        </button>
        <button
          className="text-xl font-bold text-white bg-black p-2 rounded-lg"
          onClick={resetValues}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default EditFodder;

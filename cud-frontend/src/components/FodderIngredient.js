import React, { useContext } from "react";
import orderContext from "../context/OrderContext";

const FodderIngredient = (props) => {
  const orderCtx = useContext(orderContext);
  const { updateOrder } = orderCtx;
  const { ingredient, id } = props;

  const calculatePrice = (e) => {
    let pricePerKg = parseFloat(ingredient.pricePerKg);
    let quantityInWeight = parseFloat(ingredient.quantityInWeight);
    let pricePerBag = parseFloat(ingredient.pricePerBag);
    let quantityInCount = parseFloat(ingredient.quantityInCount);
    let calculatedPrice = 0.0;

    if (e.target.value.trim() === "") {
      updateOrder(id, { ...ingredient, [e.target.name]: parseFloat(e.target.value), totalPrice: 0 });
    } else {
      if (e.target.name === "pricePerKg") {
        pricePerKg = parseFloat(e.target.value);
        calculatedPrice = parseFloat((pricePerKg * quantityInWeight).toFixed(2));
      } else if (e.target.name === "pricePerBag") {
        pricePerBag = parseFloat(e.target.value);
        calculatedPrice = parseFloat((pricePerBag * quantityInCount).toFixed(2));
      } else if (e.target.name === "quantityInWeight") {
        quantityInWeight = parseFloat(e.target.value);
        calculatedPrice = parseFloat((pricePerKg * quantityInWeight).toFixed(2));
      } else {
        quantityInCount = parseFloat(e.target.value);
        calculatedPrice = parseFloat((pricePerBag * quantityInCount).toFixed(2));
      }
      updateOrder(id, { ...ingredient, [e.target.name]: parseFloat(e.target.value), totalPrice: calculatedPrice });
    }
  };

  return (
    <div className="grid grid-cols-4 gap-6 items-center justify-center py-6 px-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      {/* Name */}
      <div>
        <p className="text-center font-semibold text-gray-800">{ingredient.name}</p>
      </div>

      {/* Price Input */}
      {ingredient.isWhole ? (
        <div className="flex flex-col items-center">
          <label className="text-sm text-gray-600 mb-1">Price per Bag</label>
          <input
            className="text-center w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min={0}
            type="number"
            name="pricePerBag"
            value={ingredient.pricePerBag}
            onChange={calculatePrice}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <label className="text-sm text-gray-600 mb-1">Price per Kg</label>
          <input
            className="text-center w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min={0}
            type="number"
            name="pricePerKg"
            value={ingredient.pricePerKg}
            onChange={calculatePrice}
          />
        </div>
      )}

      {/* Quantity Input */}
      {ingredient.isWhole ? (
        <div className="flex flex-col items-center">
          <label className="text-sm text-gray-600 mb-1">Quantity (pcs)</label>
          <input
            className="text-center w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min={0}
            type="number"
            name="quantityInCount"
            value={ingredient.quantityInCount}
            onChange={calculatePrice}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <label className="text-sm text-gray-600 mb-1">Quantity (kg)</label>
          <input
            className="text-center w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min={0}
            type="number"
            name="quantityInWeight"
            value={ingredient.quantityInWeight}
            onChange={calculatePrice}
          />
        </div>
      )}

      {/* Total Price */}
      <div className="flex flex-col items-center">
        <p className="text-gray-500 text-sm mb-1">Total Price</p>
        <p className="text-green-600 font-semibold text-lg">₹{ingredient.totalPrice}</p>
      </div>
    </div>
  );
};

export default FodderIngredient;

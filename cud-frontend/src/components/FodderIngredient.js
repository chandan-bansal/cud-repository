import React, { useContext } from "react";
import orderContext from "../context/OrderContext";

const FodderIngredient = (props) => {
  const orderCtx = useContext(orderContext);
  const { updateOrder } = orderCtx;
  const { ingredient, id } = props;

  const calculatePrice = (e) => {
    let price = parseFloat(ingredient.price);
    let quantity = parseFloat(ingredient.quantity);
    let calculatedPrice = 0.0;

    if (e.target.value.trim() === "") {
      updateOrder(id, {...ingredient, [e.target.name]: parseFloat(e.target.value), totalPrice:0});
      
    } else {
      if (e.target.name === "price") {
        price = parseFloat(e.target.value);
      } else {
        quantity = parseFloat(e.target.value);
      }

      calculatedPrice = parseFloat((price * quantity).toFixed(2));
      updateOrder(id, {...ingredient, [e.target.name]: parseFloat(e.target.value), totalPrice:calculatedPrice});
      
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4 items-center justify-center py-4 px-6 bg-gray-100 rounded-lg shadow-md">
      <div>
        <p className="flex justify-center font-semibold text-gray-700">{ingredient.ingredient}</p>
      </div>
      <div className="items-center flex justify-center">
        <input
          className="max-w-20 text-center border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          min={0}
          type="number"
          name="price"
          value={ingredient.price}
          onChange={calculatePrice}
        />
      </div>
      <div className="items-center flex justify-center">
        <input
          className="max-w-20 text-center border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          min={0}
          type="number"
          name="quantity"
          value={ingredient.quantity}
          onChange={calculatePrice}
        />
      </div>
      <div className="items-center flex justify-center">
        <p className="font-medium text-green-600">{ingredient.totalPrice}</p>
      </div>
    </div>
  );
};

export default FodderIngredient;

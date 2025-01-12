import React, { useState } from "react";

const Modal = (props) => {
  const { styles, onClose, handleSubmit } = props;
    const [newIngredient, setNewIngredient] = useState({ingredient:"", price:0, quantity:0, totalPrice:0});
    
    const handleChange = (e) =>{
        let {id, value} = e.target;
        setNewIngredient((prevObj) =>{
            let totalPrice = prevObj.price * prevObj.quantity;

            if(id === "price" || id === "quantity"){
                value = parseFloat(value);
                totalPrice = id==="price"?value*prevObj.quantity : prevObj.price*value;
            }
            const updatedObj = {...prevObj, [id]:value, ["totalPrice"] : totalPrice};
            return updatedObj; 
        })
    }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        className={`bg-white rounded-lg shadow-lg p-6 w-full max-w-sm ${styles}`}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="flex flex-col space-y-4">
          <label htmlFor="ingredient" className="text-sm font-medium text-gray-700">
            Ingredient
          </label>
          <input
            type="text"
            id="ingredient"
            name="ingredient"
            autoComplete="off"
            minLength={1}
            onChange={handleChange}
            value={newIngredient.ingredient}
            className="border border-gray-300 rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <label htmlFor="price" className="text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            min={0}
            onChange={handleChange}
            value={newIngredient.price}
            className="border border-gray-300 rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {/* <label htmlFor="price" className="text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min={0}
            onChange={handleChange}
            value={newIngredient.quantity}
            className="border border-gray-300 rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          /> */}
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600"
            onClick={() => handleSubmit(newIngredient)}
          >
            Add Ingredient
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

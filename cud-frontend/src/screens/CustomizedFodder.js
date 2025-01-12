import React, { useContext, useState } from "react";
import FodderIngredient from "../components/FodderIngredient";
import orderContext from "../context/OrderContext";
import { useLocation } from "react-router-dom";
import Modal from "../components/Modal";

const CustomizedFodder = () => {
  const orderCtx = useContext(orderContext);
  const {setOrderMap} = orderCtx;
  const [isModal, setIsModal] = useState(false);
  const { totalObject, resetValues, orderMap, addToCart,addEditedFodderToCart } = orderCtx;
  const location = useLocation();
  const pathName = location.pathname;

  const showModal = () =>{
    setIsModal(true);
  }

  const addNewIngredient = (ingredientObj) =>{
    if(ingredientObj.ingredient === ""){
      alert("Enter a valid name");
      return;
    }

    else{
      setOrderMap((prevMap)=>{
        const id = Date.now();
        const newMap = prevMap
        newMap.set(id, ingredientObj);
        return newMap;
      })
    }
    hideModal();

  }
  const hideModal = () =>{
    setIsModal(false);
  }
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
      {isModal && <Modal onClose={hideModal} handleSubmit={addNewIngredient}/>}

      {/* Total Sum */}
      <div className=" flex mt-6 p-4 bg-gray-100 rounded-lg shadow-md text-right justify-between">
        <p className="text-xl font-semibold text-gray-800">
          Total Weight(in kgs):{" "}
          <span className="text-green-600">{totalObject.weight}</span>
        </p>
        <p className="text-xl font-semibold text-gray-800">
          Total Sum: <span className="text-green-600">⟨₹⟩{totalObject.sum}</span>
        </p>

        <button className="text-xl font-bold text-white bg-green-600 p-2 rounded-lg"
          onClick={showModal}
        >
          Add Ingredient
        </button>
        <button className="text-xl font-bold text-white bg-green-600 p-2 rounded-lg"
        onClick={pathName.includes("edit")?addEditedFodderToCart:addToCart}>
          Add to Cart
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

export default CustomizedFodder;

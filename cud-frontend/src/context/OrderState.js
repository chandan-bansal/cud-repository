import React, { useContext, useEffect, useState } from "react";
import OrderContext from "./OrderContext";
import { ingredientMap } from "../data";
import cartContext from "./CartContext";
const OrderState = (props) => {
  const cartCtx = useContext(cartContext);
  const { addFodderToCart } = cartCtx;
  const [orderMap, setOrderMap] = useState(ingredientMap);
  const [editFodderId, setEditFodderId] = useState("");
  const [totalObject, setTotalObject] = useState({ sum: 0, weight: 0 });

  useEffect(()=>{updateTotalObject(orderMap)},[orderMap])
  const updateTotalObject = (newMap) => {
    let sum = 0;
    let weight = 0;
    for (const [, value] of newMap) {
      sum += value.totalPrice;
      weight += value.quantity;
    }
    weight = parseFloat(weight.toFixed(2));
    setTotalObject({ sum: sum, weight: weight });
  };
  const updateOrder = (id, ingredientObject) => {
    setOrderMap((prevMap) => {
      // Create a new Map instance and copy the previous entries
      let newMap = new Map(prevMap);
      newMap.set(id, ingredientObject); // Update the new Map
      return newMap; // Return the new Map
    });
  };

  const resetFodder = () => {
    setOrderMap((prevMap) => {
      let newMap = new Map(ingredientMap);
      return newMap;
    });
    setTotalObject({ sum: 0, weight: 0 });
  };

  const addEditedFodderToCart = () =>{
    if (totalObject["sum"] !== 0) {
      addFodderToCart(
        editFodderId,
        orderMap,
        totalObject.sum,
        totalObject.weight
      );
    }
    resetFodder();
  }
  const addToCart = () => {
    if (totalObject["sum"] !== 0) {
      addFodderToCart(
        Date.now(),
        orderMap,
        totalObject.sum,
        totalObject.weight
      );
    }
    resetFodder();
  };
  return (
    <OrderContext.Provider
      value={{
        orderMap,
        updateOrder,
        totalObject,
        resetFodder,
        addToCart,
        setOrderMap,
        setEditFodderId,
        addEditedFodderToCart
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderState;

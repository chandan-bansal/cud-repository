import React, { useContext, useEffect, useState } from "react";
import OrderContext from "./OrderContext";
import cartContext from "./CartContext";
import allProductContext from "./AllProductsContext";
const OrderState = (props) => {
  const cartCtx = useContext(cartContext);
  const allProductsCtx = useContext(allProductContext);
  const {fodderMap} = allProductsCtx;
  const { addFodderToCart, clearOrders } = cartCtx;
  const [orderMap, setOrderMap] = useState(fodderMap);
  const [editFodderId, setEditFodderId] = useState("");
  const [totalObject, setTotalObject] = useState({ sum: 0, weight: 0 });
  useEffect(()=>{setOrderMap(fodderMap)},[fodderMap])
  useEffect(()=>{updateTotalObject(orderMap)},[orderMap])
  useEffect(() => {
    resetFodder();
  }, [clearOrders]);
  const updateTotalObject = (newMap) => {
    let sum = 0;
    let weight = 0;
    if(newMap){
      for (const [,value] of Object.entries(newMap)) {
        sum += value.totalPrice;
        if(value.isWhole){
          let wt = value.weightOfBag*value.quantityInCount;
          weight += wt;
        }
        else{
          weight += value.quantityInWeight;
        }
      }
      weight = parseFloat(weight.toFixed(2));
      setTotalObject({ sum: sum, weight: weight });
    }
    
  };
  const updateOrder = (id, ingredientObject) => {
    setOrderMap((prevMap) => {
      let newMap = {...prevMap};
      newMap[id] = ingredientObject; // Update the new Map
      console.log("Update Order", newMap)
      return newMap; // Return the new Map
    });
  };

  const resetFodder = () => {
    console.log("Reset Fodder")
    setOrderMap((prevMap) => {
      let newMap = fodderMap;
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
        editFodderId,
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

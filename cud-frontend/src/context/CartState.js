import React, { useEffect, useState } from "react";
import CartContext from "./CartContext";
const CartState = (props) => {
  const [cartObject, setCartObject] = useState(() => {
    // Get saved data from localStorage
    const savedData = localStorage.getItem("myData");
    return savedData
      ? JSON.parse(savedData)
      : { fodderInCart: {}, productInCart: {} }; // Default value if no data
  });

  useEffect(() => {
    localStorage.setItem("myData", JSON.stringify(cartObject));
  }, [cartObject]);


  //Add Fodder to Cart
  const addFodderToCart = (id, fodder, sum, weight) => {
    console.log(id);
    setCartObject((prevCart) => {
      const updatedCart = {
        ...prevCart,
        "fodderInCart": {
          ...prevCart["fodderInCart"],
          [id]: { order: fodder, totalSum: sum, totalWeight: weight },
        },
      };
      return updatedCart;
    });
  };


  //Add Product to Cart
  const addProductToCart = (id, product) => {
    const newProductList = cartObject["productInCart"];
    if (id in newProductList) {
      const givenSum = newProductList[id].totalSum;
      const givenQuantity = newProductList[id].totalQuantity;
      const newProductObject = {
        ...newProductList[id],
        totalSum: givenSum + product.discountedPrice,
        totalQuantity: givenQuantity + 1,
      };
      setCartObject((prevCart) => {
        const updatedCart = {
          ...prevCart,
          "productInCart": {...newProductList, [id]: newProductObject},
        };
        return updatedCart;
      });
    } else {
      const newProductObject = {
        product: product,
        totalSum: product.discountedPrice,
        totalQuantity: 1,
      };
      setCartObject((prevCart) => {
        const updatedCart = {
          ...prevCart,
          "productInCart": {...newProductList, [id]: newProductObject},
        };
        return updatedCart;
      });
    }
    
  };


  //Delete Fodder from cart
  const deleteFodderFromCart = (id) => {
    const newFodderList = cartObject["fodderInCart"];
    if(id in newFodderList){
        delete newFodderList[id];
        setCartObject((prevObject) => {
            const updatedCart = {
              ...prevObject,
              "fodderInCart": {
                ...newFodderList,
              },
            };
            return updatedCart;
          });

    }
    else{
        // Does not exist
    }
  };


  //Delete Product from Cart
  const deleteProductFromCart = (id, product) => {
    const newProductList = cartObject["productInCart"];
    if (id in newProductList) {
      const givenSum = newProductList[id].totalSum;
      const givenQuantity = newProductList[id].totalQuantity;
      if (givenQuantity - 1 === 0) {
        delete newProductList[id];
      } else {
        const newProductObject = {
          ...newProductList[id],
          totalSum: givenSum - product.discountedPrice,
          totalQuantity: givenQuantity - 1,
        };
        setCartObject((prevObject) => {
          const updatedCart = {
            ...prevObject,
            "productInCart": { ...newProductList, [id]: newProductObject },
          };
          return updatedCart;
        });
      }
    } else {

        //Product is not there
    }
    
  };
  return (
    <CartContext.Provider
      value={{
        cartObject,
        addFodderToCart,
        addProductToCart,
        deleteFodderFromCart,
        deleteProductFromCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartState;

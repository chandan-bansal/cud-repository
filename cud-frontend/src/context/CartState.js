import React, { useContext, useEffect, useState } from "react";
import CartContext from "./CartContext";
import customerContext from "./CustomerContext";
import { useNavigate } from "react-router-dom";

const CartState = (props) => {
  const host = "https://cud-repository-backend.onrender.com"
  const customerCtx = useContext(customerContext);
  const { loggedInCustomer } = customerCtx;
  const [clearOrders, setClearOrders] = useState(true);
  const navigate = useNavigate();
  const [cartObject, setCartObject] = useState(() => {
    // Get saved data from localStorage
    const savedData = localStorage.getItem("myData");
    return savedData
      ? JSON.parse(savedData)
      : { fodderInCart: {}, productInCart: {}, totalCartSum: 0, createdOn:""}; // Default value if no data
  });

  const [customerOrders, setCustomerOrders] = useState([])
  const [allPrevOrders, setAllPrevOrders] = useState([]);
  useEffect(() => {
    localStorage.setItem("myData", JSON.stringify(cartObject));
  }, [cartObject]);
  useEffect(() => {
    getAllPreviousOrders();
  },[]);

  const convertMapToObject = (mp) =>{
    let newObject = {};
    mp.forEach((value, key, mpp) =>{
      newObject[key] = value;
    })
    return newObject;
  }
  const calculateTotalCartSum = (orderObj) => {
    let sum = 0;
    for (let [key, value] of Object.entries(orderObj["fodderInCart"])) {
      sum += value["totalSum"];
    }
    for (let [key, value] of Object.entries(orderObj["productInCart"])) {
      sum += value["totalSum"];
    }
    return sum;
  };
  //Add Fodder to Cart
  const addFodderToCart = (id, fodder, sum, weight) => {
    setCartObject((prevCart) => {
      const modifiedFodderObject = convertMapToObject(fodder);
      const updatedCart = {
        ...prevCart,
        fodderInCart: {
          ...prevCart["fodderInCart"],
          [id]: { order: modifiedFodderObject, totalSum: sum, totalWeight: weight },
        },
      };
    
      const totalSum = calculateTotalCartSum(updatedCart);
      updatedCart["totalCartSum"] = totalSum;
      
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
          productInCart: { ...newProductList, [id]: newProductObject },
        };
        const totalSum = calculateTotalCartSum(updatedCart);
        updatedCart["totalCartSum"] = totalSum;
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
          productInCart: { ...newProductList, [id]: newProductObject },
        };
        return updatedCart;
      });
    }
  };

  const saveOrderInCart = async () => {
    try {
      if(Object.keys(loggedInCustomer).length === 0){
        alert("Please Select a Customer")
        return;
      }
      if(Object.keys(cartObject["fodderInCart"]).length === 0 && Object.keys(cartObject["productInCart"]).length === 0){
        alert("No products or fodder has been added to the cart");
        return;
      }
      const modifiedCartObject = {
        ...cartObject,
        ["createdOn"] : new Date()
      }
      console.log(loggedInCustomer);
      const response = await fetch(`${host}/newOrder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId: loggedInCustomer._id, // Assign key name to loggedInUser.id
          orderDetails: modifiedCartObject, // Assign key name to cartObject
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Order saved successfully:", data);
      getAllPreviousOrders();
      setCartObject({ fodderInCart: {}, productInCart: {}, totalCartSum: 0, createdOn:""});
      setClearOrders((prev)=>{
        return !prev;
      })
      alert(`Saved order for Mr. ${loggedInCustomer.name} successfully`)
      navigate("/");
      
    } catch (error) {
      console.error("Error saving order in cart:", error);
    }
  };

  //Get All Previous Orders
  const getAllPreviousOrders = async () => {
    try {
      const response = await fetch(`${host}/orders`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setAllPrevOrders(data);
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  };
  // Get Orders for a particular customer

  const getAllOrdersOfCustomer = async(customer_id) =>{
    try {
      const response = await fetch(`${host}/orders/${customer_id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(`Customer id: ${customer_id}`, data);
      setCustomerOrders(data);
      if(data.length === 0){
        alert(`No orders yet`)
      }
      else{
        navigate(`/orders/${customer_id}`)
      }
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  }

  const getOrder = (orderId) => {
    const particularOrder = allPrevOrders.filter(item => item.order_id == orderId);
    return particularOrder;
  }
  //Delete Fodder from cart
  const deleteFodderFromCart = (id) => {
    const newFodderList = cartObject["fodderInCart"];
    if (id in newFodderList) {
      delete newFodderList[id];
      setCartObject((prevObject) => {
        const updatedCart = {
          ...prevObject,
          fodderInCart: {
            ...newFodderList,
          },
        };
        const totalSum = calculateTotalCartSum(updatedCart);
        updatedCart["totalCartSum"] = totalSum;
        return updatedCart;
      });
    } else {
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
        setCartObject((prevObject) =>{
          const updatedCart = {
            ...prevObject,
            productInCart: { ...newProductList },
          };
          const totalSum = calculateTotalCartSum(updatedCart);
          updatedCart["totalCartSum"] = totalSum;
          return updatedCart;
        })
      } else {
        const newProductObject = {
          ...newProductList[id],
          totalSum: givenSum - product.discountedPrice,
          totalQuantity: givenQuantity - 1,
        };
        setCartObject((prevObject) => {
          const updatedCart = {
            ...prevObject,
            productInCart: { ...newProductList, [id]: newProductObject },
          };
          const totalSum = calculateTotalCartSum(updatedCart);
          updatedCart["totalCartSum"] = totalSum;
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
        saveOrderInCart,
        getAllOrdersOfCustomer,
        getOrder,
        allPrevOrders,
        clearOrders,
        customerOrders
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartState;

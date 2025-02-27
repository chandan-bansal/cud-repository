import React, { useContext, useEffect, useState } from "react";
import CartContext from "./CartContext";
import customerContext from "./CustomerContext";
import { useNavigate } from "react-router-dom";
const host = "http://localhost:5000";
const CartState = (props) => {
<<<<<<< HEAD
=======
  const host = "https://cud-repository-backend.onrender.com"
>>>>>>> origin/main
  const customerCtx = useContext(customerContext);
  const { loggedInCustomer } = customerCtx;
  const [clearOrders, setClearOrders] = useState(true);
  const navigate = useNavigate();
  const [cartObject, setCartObject] = useState(() => {
    // Get saved data from localStorage
    const savedData = localStorage.getItem("myData");
    return savedData
      ? JSON.parse(savedData)
      : { fodderInCart: {}, productInCart: {}, totalCartSum: 0, createdOn: "" }; // Default value if no data
  });

  const [customerOrders, setCustomerOrders] = useState([]);
  const [allPrevOrders, setAllPrevOrders] = useState([]);
  useEffect(() => {
    localStorage.setItem("myData", JSON.stringify(cartObject));
  }, [cartObject]);
  useEffect(() => {
    getAllPreviousOrders();
  }, []);

  const calculateTotalCartSum = (orderObj) => {
    let sum = 0;
    for (const value of Object.values(orderObj["fodderInCart"])) {
      sum += value.totalSum;
    }
    for (const value of Object.values(orderObj["productInCart"])) {
      sum += value["totalSum"];
    }
    return sum;
  };
  //Add Fodder to Cart
  const addFodderToCart = (id, fodder, sum, weight) => {
    setCartObject((prevCart) => {
      const modifiedFodderObject = fodder;
      const updatedCart = {
        ...prevCart,
        fodderInCart: {
          ...prevCart["fodderInCart"],
          [id]: {
            order: modifiedFodderObject,
            totalSum: sum,
            totalWeight: weight,
          },
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
        totalSum: givenSum + product.pricePerBag,
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
        totalSum: product.pricePerBag,
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

  const summarizeProductsforInventoryUpdate = (
    orderDetails,
    identifyingKey,
    resultingObj
  ) => {
    for (let product in orderDetails[identifyingKey]) {
      let count = product.quantityInCount;
      let weight = product.quantityInWeight;
      if (product._id in resultingObj) {
        if (product.isWhole) {
          count += resultingObj[product._id].quantityInCount;
          resultingObj = {
            ...resultingObj,
            [product._id]: { quantityInCount: count },
          };
        } else {
          count += resultingObj[product._id].quantityInCount;
          weight += resultingObj[product._id].quantityInWeight;
          resultingObj = {
            ...resultingObj,
            [product._id]: { quantityInCount: count, quantityInWeight: weight },
          };
        }
      } else {
        if (product.isWhole) {
          resultingObj = {
            ...resultingObj,
            [product._id]: { quantityInCount: count },
          };
        } else {
          resultingObj = {
            ...resultingObj,
            [product._id]: { quantityInCount: count, quantityInWeight: weight },
          };
        }
      }
    }
  };

  const summarizeProducts = (orderDetails, resultingObj) => {
    console.log("Result", resultingObj);
    for (const [key, value] of Object.entries(orderDetails["productInCart"])) {
      let count = value.totalQuantity;
      if (key in resultingObj) {
        if (value.product.isWhole) {
          resultingObj = {
            ...resultingObj,
            [key]: {
              quantityInCount: count + resultingObj[key].quantityInCount,
            },
          };
        } else {
          resultingObj = {
            ...resultingObj,
            [key]: {
              quantityInWeight:
                resultingObj[key].quantityInWeight +
                count * value.product.weightOfBag,
            },
          };
        }
      } else {
        if (value.product.isWhole) {
          resultingObj = { ...resultingObj, [key]: { quantityInCount: count } };
        } else {
          resultingObj = {
            ...resultingObj,
            [key]: { quantityInWeight: count * value.product.weightOfBag },
          };
        }
      }
      console.log("result obj", resultingObj);
    }
    return resultingObj;
  };

  const summarizeFodderProducts = (orderDetails, resultingObj) => {
    for (const [key, value] of Object.entries(orderDetails["fodderInCart"])) {
      for (const [id, obj] of Object.entries(value.order)) {
        if (obj.quantityInCount != 0 || obj.quantityInWeight != 0) {
          {
            if (id in resultingObj) {
              if (obj.isWhole) {
                resultingObj = {
                  ...resultingObj,
                  [id]: {
                    quantityInCount:
                      obj.quantityInCount + resultingObj[id].quantityInCount,
                  },
                };
              } else {
                resultingObj = {
                  ...resultingObj,
                  [id]: {
                    quantityInWeight:
                      resultingObj[id].quantityInWeight + obj.quantityInWeight,
                  },
                };
              }
            } else {
              if (obj.isWhole) {
                resultingObj = {
                  ...resultingObj,
                  [id]: { quantityInCount: obj.quantityInCount },
                };
              } else {
                resultingObj = {
                  ...resultingObj,
                  [id]: { quantityInWeight: obj.quantityInWeight },
                };
              }
            }
          }
        }
      }
    }
    return resultingObj;
  };
  const saveOrderInCart = async () => {
    try {
      if (Object.keys(loggedInCustomer).length === 0) {
        alert("Please Select a Customer");
        return;
      }
      if (
        Object.keys(cartObject["fodderInCart"]).length === 0 &&
        Object.keys(cartObject["productInCart"]).length === 0
      ) {
        alert("No products or fodder has been added to the cart");
        return;
      }
      const modifiedCartObject = {
        ...cartObject,
        createdOn: new Date(),
      };
      let productObj = {};
      console.log("Order Details", productObj);
      //Parse products added to the cart
      if ("productInCart" in cartObject) {
        productObj = summarizeProducts(cartObject, productObj);
        console.log("Here");
      }
      console.log("Product Object1", productObj);
      if ("fodderInCart" in cartObject) {
        productObj = summarizeFodderProducts(cartObject, productObj);
      }
      console.log("Product Object", productObj);
      console.log(loggedInCustomer);
      const response = await fetch(`${host}/newOrder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId: loggedInCustomer._id, // Assign key name to loggedInUser.id
          orderDetails: modifiedCartObject, // Assign key name to cartObject
          bulkUpdates: productObj,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Order saved successfully:", data);
      getAllPreviousOrders();
      setCartObject({
        fodderInCart: {},
        productInCart: {},
        totalCartSum: 0,
        createdOn: "",
      });
      setClearOrders((prev) => {
        return !prev;
      });
      alert(`Saved order for Mr. ${loggedInCustomer.name} successfully`);
      navigate("/");
    } catch (error) {
      console.error("Error saving order in cart:", error);
    }
  };

  // Get All Previous Orders
  const getAllPreviousOrders = async () => {
    try {
      const response = await fetch(`${host}/orders`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      console.log("Data Before Sorting:", data);

      data.sort((a, b) => {
        const dateA = new Date(a?.order_details?.createdOn);
        const dateB = new Date(b?.order_details?.createdOn);
        // Handle invalid dates
        if (isNaN(dateA)) return 1;
        if (isNaN(dateB)) return -1;

        return dateB - dateA; // Newest first
      });

      console.log("Data After Sorting:", data);

      setAllPrevOrders(data);
    } catch (error) {
      console.error("Error fetching previous orders:", error.message, error);
    }
  };

  // Get Orders for a particular customer

  const getAllOrdersOfCustomer = async (customer_id) => {
    try {
      const response = await fetch(`${host}/orders/${customer_id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      data.sort((a, b) => {
        const dateA = new Date(a?.order_details?.createdOn);
        const dateB = new Date(b?.order_details?.createdOn);
        // Handle invalid dates
        if (isNaN(dateA)) return 1;
        if (isNaN(dateB)) return -1;

        return dateB - dateA; // Newest first
      });
      setCustomerOrders(data);
      if (data.length === 0) {
        alert(`No orders yet`);
      } else {
        navigate(`/orders/${customer_id}`);
      }
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  };

  const getOrder = (orderId) => {
    const particularOrder = allPrevOrders.filter(
      (item) => item.order_id === orderId
    );
    return particularOrder;
  };
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
        setCartObject((prevObject) => {
          const updatedCart = {
            ...prevObject,
            productInCart: { ...newProductList },
          };
          const totalSum = calculateTotalCartSum(updatedCart);
          updatedCart["totalCartSum"] = totalSum;
          return updatedCart;
        });
      } else {
        const newProductObject = {
          ...newProductList[id],
          totalSum: givenSum - product.pricePerBag,
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
        customerOrders,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartState;

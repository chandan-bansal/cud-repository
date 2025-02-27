import React, { useEffect, useState } from "react";
import AllProductContext from "./AllProductsContext";
const host = "http://localhost:5000";
const AllProductsState = (props) => {
  const [productObject, setProductObject] = useState(() => {
    const savedData = localStorage.getItem("fetchedProducts");
    return savedData
      ? JSON.parse(savedData)
      : {
          allProducts: [],
          allProductsMap: {},
          fodderMap: {},
        };
  });
  useEffect(() =>{localStorage.setItem("fetchedProducts", JSON.stringify(productObject))},[productObject])
  useEffect(() => {
    fetchAllProducts().catch((error) =>
      console.error("Error fetching products:", error)
    );
  }, []);

  const fetchAllProducts = async () => {
    try {
      const response = await fetch(`${host}/admin/getAllProducts`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      divideProducts(data);
      console.log("Fetched Products:", data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const divideProducts = (productsData) => {
    let allProObject = {};
    let fodderIngredientsMap = {};
    productsData.forEach((product) => {
      const { category, _id, isFodderIngredient } = product;
      if (category in allProObject) {
        // Add product to allProMap
        allProObject[category] = {
          ...allProObject[category],
          [_id]: {
            ...product,
            quantityInCount: 0,
            quantityInWeight: 0,
            totalPrice: 0,
            addedToFodder: false,
          },
        };
      } else {
        allProObject[category] = {
          [_id]: {
            ...product,
            quantityInCount: 0,
            quantityInWeight: 0,
            totalPrice: 0,
            addedToFodder: false,
          },
        };
      }
      // Add to fodderIngredientsMap if it is a fodder ingredient
      if (isFodderIngredient) {
        fodderIngredientsMap[_id] ={
          ...product,
          quantityInCount: 0,
          quantityInWeight: 0,
          totalPrice: 0,
        };
      }
    });
    setProductObject({
      allProducts: productsData,
      allProductsMap: allProObject,
      fodderMap: fodderIngredientsMap,
    });
  };

  return (
    <AllProductContext.Provider value={productObject}>
      {props.children}
    </AllProductContext.Provider>
  );
};

export default AllProductsState;

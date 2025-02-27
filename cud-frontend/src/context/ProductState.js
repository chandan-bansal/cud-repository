import React, { useState, useEffect, useContext } from "react";
import ProductContext from "./ProductContext";
import cartContext from "./CartContext";
import allProductContext from "./AllProductsContext";
const ProductState = (props) => {
  const allProductsCtx = useContext(allProductContext);
  const { allProductsMap } = allProductsCtx;
  const [productList, setProductList] = useState(() => {
    // Get saved data from localStorage
    const savedData = localStorage.getItem("productList");
    return savedData ? JSON.parse(savedData) : allProductsMap; // Default value if no data
  });
  useEffect(()=>{setProductList(allProductsMap)},[allProductsMap])
  // const [productList, setProductList] = useState(allProductsMap)
  const cartCtx = useContext(cartContext);
  const { clearOrders } = cartCtx;
  useEffect(() => {
    localStorage.setItem("productList", JSON.stringify(productList));
  }, [productList]);
  useEffect(() => {
    resetProducts();
  }, [clearOrders]);
  const removeProductFromProductScreen = (id, category, product) => {
    const productWithGivenId = productList[category][id];
    if (productWithGivenId.quantityInCount !== 0) {
      setProductList((prevProductList) => {
        const updatedList = {
          ...prevProductList,
          [category]: {
            ...prevProductList[category],
            [id]: {
              ...productWithGivenId,
              quantityInCount: productWithGivenId.quantityInCount - 1,
            },
          },
        };
        return updatedList;
      });
    }
  };

  const addProductInProductScreen = (id, category, product) => {
    const productWithGivenId = productList[category][id];
    setProductList((prevProductList) => {
      const updatedList = {
        ...prevProductList,
        [category]: {
          ...prevProductList[category],
          [id]: {
            ...productWithGivenId,
            quantityInCount: productWithGivenId.quantityInCount + 1,
          },
        },
      };

      return updatedList;
    });
  };

  const updateAddedToFodder = (id, category, value) => {
    const productWithGivenId = productList[category][id];
    setProductList((prevProductList) => {
      const updatedList = {
        ...prevProductList,
        [category]: {
          ...prevProductList[category],
          [id]: {
            ...productWithGivenId,
            addedToFodder: value,
          },
        },
      };

      return updatedList;
    });
  };

  const updateAddedToFodderForProductList = (fodderObj) =>{
    setProductList((prevList)=>{
      let newList = {...prevList};
     for(const [key, products] of Object.entries(prevList)){
      for(const [id, value] of Object.entries(products)){
        if(value.productCanBeAddedToFodder){
          if(id in fodderObj){
            newList = {...newList, [key]:{...newList[key], [id]: {...value, addedToFodder:true}}}
          }
          else{
            newList = {...newList, [key]:{...newList[key], [id]: {...value, addedToFodder:false}}}

          }
        }
        else{
          newList = {...newList, [key]:{...newList[key], [id]: {...value}}}

        }
      }
     }
     return newList;
    })
  }

  const resetAddToFodderStateofAllProducts = () =>{
    setProductList((prevList)=>{
      let newList = {...prevList};
     for(const [key, products] of Object.entries(prevList)){
      for(const [id, value] of Object.entries(products)){
        if(value.productCanBeAddedToFodder){
            newList = {...newList, [key]:{...newList[key], [id]: {...value, addedToFodder:false}}}
          
        }
        else{
          newList = {...newList, [key]:{...newList[key], [id]: {...value}}}

        }
      }
     }
     return newList;
    })
  }
  const resetProducts = () => {
    setProductList(allProductsMap);
  };
  return (
    <ProductContext.Provider
      value={{
        productList,
        removeProductFromProductScreen,
        addProductInProductScreen,
        resetProducts,
        updateAddedToFodder,
        updateAddedToFodderForProductList,
        resetAddToFodderStateofAllProducts
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;

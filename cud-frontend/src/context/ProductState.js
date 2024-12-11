import React, { useState, useEffect } from 'react'
import ProductContext from './ProductContext'
import { allProducts } from '../data';
const ProductState = (props) => {
    const [productList, setProductList] = useState(() => {
        // Get saved data from localStorage
        const savedData = localStorage.getItem("productList");
        return savedData
          ? JSON.parse(savedData)
          : allProducts; // Default value if no data
      });
    
      useEffect(() => {
        localStorage.setItem("productList", JSON.stringify(productList));
      }, [productList]);

      const removeProductFromProductScreen = (id, category, product) =>{
        const productWithGivenId = productList[category][id];
        if(productWithGivenId.quantity !== 0){
          setProductList((prevProductList) =>{
            const updatedList = {...prevProductList, [category]: {...prevProductList[category], [id]:{...productWithGivenId, quantity: productWithGivenId.quantity - 1}}}
            return updatedList
          })
        }
      }

      const addProductInProductScreen = (id, category, product) =>{
        const productWithGivenId = productList[category][id];
          setProductList((prevProductList) =>{
            const updatedList = {...prevProductList, [category]: {...prevProductList[category], [id]:{...productWithGivenId, quantity: productWithGivenId.quantity + 1}}}
            console.log(updatedList)
            return updatedList
          })
        
      }
  return (
    <ProductContext.Provider value={{productList, removeProductFromProductScreen, addProductInProductScreen}}>
        {props.children}
    </ProductContext.Provider>
  )
}

export default ProductState
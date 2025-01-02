import React, { useState, useEffect, useContext } from 'react'
import ProductContext from './ProductContext'
import { allProducts } from '../data';
import cartContext from './CartContext';
const ProductState = (props) => {
    const [productList, setProductList] = useState(() => {
        // Get saved data from localStorage
        const savedData = localStorage.getItem("productList");
        return savedData
          ? JSON.parse(savedData)
          : allProducts; // Default value if no data
      });
    const cartCtx = useContext(cartContext);
    const {clearOrders} = cartCtx;
      useEffect(() => {
        localStorage.setItem("productList", JSON.stringify(productList));
      }, [productList]);
      useEffect(()=>{
        resetProducts();
      },[clearOrders])
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
            
            return updatedList
          })
        
      }

      const resetProducts = () =>{
        setProductList(allProducts);
      }
  return (
    <ProductContext.Provider value={{productList, removeProductFromProductScreen, addProductInProductScreen, resetProducts}}>
        {props.children}
    </ProductContext.Provider>
  )
}

export default ProductState
import React, { useEffect, useState } from 'react'
import ProductContext from './ProductContext'
const host = "http://localhost:5000";
const ProductState = (props) => {
    const [productsArr, setProductsArr] = useState(() =>{
        const savedData = localStorage.getItem("productsAdmin");
        return savedData?JSON.parse(savedData):[];
    });
    useEffect(()=>{
        getAllProducts();
    },[])
    useEffect(()=>{
        localStorage.setItem("productsAdmin", JSON.stringify(productsArr));
    },[productsArr])
    const getAllProducts = async() =>{
        console.log("Get All Products");
        try{
        const response = await fetch(`${host}/admin/getAllProducts`,
            {
                method: "GET",
                headers: {"Content-Type": "application/json" }
            }
        );

        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setProductsArr(data);
        console.log(data);
    }
    catch(err){
        console.error("Failed to fetch products:", err);
    }

    }

    const addProduct = async(newProduct) =>{
        console.log("Add Products");
        try{
        const response = await fetch(`${host}/admin/addProduct`,{
            method:"POST",
            headers:{"Content-Type" : "application/json"},
            body: JSON.stringify({productDetails: newProduct})
        })

        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        getAllProducts();
        console.log("Product Added Successfully")
    }catch(err){
        console.log("Failed to add product", err)
    }
    }

    const replaceProduct = async(editProduct) =>{
        console.log("Replace Products");
        try{
            const response = await fetch(`${host}/admin/editProduct`,{
                method:"PUT",
                headers:{"Content-Type" : "application/json"},
                body: JSON.stringify({productId:editProduct._id, editProduct: editProduct})
            })
    
            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            getAllProducts();
            console.log("Product Edited Successfully")
        }catch(err){
            console.log("Failed to edit product", err)
        }
    }
  return (
    <ProductContext.Provider value={{getAllProducts, addProduct, replaceProduct, productsArr}}>
        {props.children}
    </ProductContext.Provider>
  )
}

export default ProductState
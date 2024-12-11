import React, { useContext } from "react";
import productContext from "../context/ProductContext";
import CartContext from "../context/CartContext";

const ProductItem = (props) => {
  const { product, id, category } = props;
  const productCtx = useContext(productContext);
  const {removeProductFromProductScreen, addProductInProductScreen} = productCtx;

  const cartCtx = useContext(CartContext);
  const {addProductToCart, deleteProductFromCart} = cartCtx
  const removeProduct = () =>{
    deleteProductFromCart(id, product);
    removeProductFromProductScreen(id, category, product);
  }

  const increaseProduct =() =>{
    addProductToCart(id, product);
    addProductInProductScreen(id, category, product);
  }
  return (
    <div className="flex flex-col w-60 m-4 p-4 bg-white border border-gray-300 rounded-2xl items-center justify-center cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-2 transition-transform duration-200">
      {/* Product Image */}
      <img
        src={product.imageUrl}
        className="h-40 w-40 object-cover rounded-lg mb-4"
        alt={product.name}
      />

      {/* Product Details */}
      <div className="flex flex-col text-center">
        <h5 className="font-semibold text-gray-800 text-lg mb-2">{product.name}</h5>
        <p className="flex justify-center items-center text-gray-600 text-sm">
          <strike className="italic font-light text-red-500 mr-2">{product.price}</strike>
          <span className="text-green-600 font-bold">{product.discountedPrice}</span>
        </p>

        {/* Quantity Selector */}
        <div className="flex justify-center items-center mt-4">
          <button className="bg-blue-600 text-white h-8 w-8 rounded-full shadow-lg hover:bg-blue-700 active:scale-90 transition-transform" onClick={removeProduct}>
            -
          </button>
          <span className="mx-4 font-medium text-gray-700 text-lg">{product.quantity}</span>
          <button className="bg-blue-600 text-white h-8 w-8 rounded-full shadow-lg hover:bg-blue-700 active:scale-90 transition-transform" onClick={increaseProduct}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;

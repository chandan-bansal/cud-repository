import React from "react";
import ProductCartItem from "./ProductCartItem";

const ProductCart = (props) => {
  const { items } = props;
  const productItems = items?items:{};
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      {Object.entries(productItems).length === 0 ? (
        <p className="text-gray-500 text-center">No Product Added</p>
      ) : (
        <div className="grid grid-cols-4 gap-4 text-gray-700 font-semibold mb-4">
          <p className="text-center">Product Name</p>
          <p className="text-center">Quantity</p>
          <p className="text-center">Price</p>
          <p className="text-center">Total Price</p>
        </div>
      )}
      {Object.entries(productItems).map(([key, value]) => (
        <ProductCartItem key={key} id={key} productDetails={value} />
      ))}
    </div>
  );
};

export default ProductCart;

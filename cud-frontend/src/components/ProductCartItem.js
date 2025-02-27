import React from "react";

const ProductCartItem = (props) => {
  const { id, productDetails } = props;

  return (
    <div className="grid grid-cols-4 gap-4 items-center justify-center p-2 border-b border-gray-200">
      <p className="text-center text-gray-600">{productDetails.product.name}</p>
      <p className="text-center text-gray-600">{productDetails.totalQuantity} Pcs</p>
      <p className="text-center text-gray-600">⟨₹⟩{productDetails.product.pricePerBag}</p>
      <p className="text-center text-gray-600">⟨₹⟩{productDetails.totalSum}</p>
      
    </div>
  );
};

export default ProductCartItem;

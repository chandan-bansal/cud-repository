import React from 'react';
import {useNavigate} from 'react-router-dom'
const ProductItem = ({ product }) => {
  const navigate = useNavigate();
  const handleClick = () =>{
    navigate(`/productDetails/${product._id}`)
  }
  return (
    <div className="grid grid-cols-4 text-center p-4 border-b border-gray-300 cursor-pointer hover:bg-gray-300" onClick={handleClick}>
      <p>{product._id}</p>
      <p>{product.name}</p>
      <p>{product.category}</p>
      <p>
        <span>{product.isWhole
          ? product.totalAvailableCount
          : product.totalAvailableWeight}
          </span>
          <span>
          {product.isWhole
          ? " Pcs"
          : " kg"}
          </span>
      </p>
    </div>
  );
};

export default ProductItem;

import React from 'react'
import ProductItem from './ProductItem';

const Product = (props) => {
    const {product, title} = props;
  return (
    <>
    <h1 className="text-2xl font-bold ml-2">{title}</h1>
    <div className="flex overflow-scroll">
        {Object.entries(product).map(([key, value])=>{return(
            <ProductItem key={key} category={title} id = {key} product={value}/>
        )})}
    </div>
    </>
  )
}

export default Product
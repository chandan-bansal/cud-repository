import React, { useContext } from "react";
import productContext from "../context/ProductContext";
import CartContext from "../context/CartContext";
import orderContext from "../context/OrderContext";

const ProductItem = (props) => {
  const { product, id, category } = props;
  const productCtx = useContext(productContext);
  const { removeProductFromProductScreen, addProductInProductScreen, updateAddedToFodder } = productCtx;
  const orderCtx = useContext(orderContext);
  const { setOrderMap } = orderCtx;
  const cartCtx = useContext(CartContext);
  const { addProductToCart, deleteProductFromCart } = cartCtx;

  const removeProduct = () => {
    deleteProductFromCart(id, product);
    removeProductFromProductScreen(id, category, product);
  };

  const increaseProduct = () => {
    addProductToCart(id, product);
    addProductInProductScreen(id, category, product);
  };

  const handleAddToFodder = () => {
    updateAddedToFodder(id, category, true);
    setOrderMap((prevMap) => {
      const pId = id;
      const newMap = { ...prevMap };
      const newProduct = {...product, quantityInCount: 0,
        quantityInWeight: 0,
        totalPrice: 0};
      newMap[pId] = newProduct;
      console.log("Added Successfully", newMap);
      return newMap;
    });
  };

  const handleRemoveFromFodder = () => {
    updateAddedToFodder(id, category, false);
    console.log(id);
    setOrderMap((prevMap) => {
      let newMap = { ...prevMap }; // Create a shallow copy of the map
      console.log("Before", newMap);
      delete newMap[id]; // Use square brackets to dynamically delete the key
      console.log("After", newMap);
      console.log("Removed Successfully");
      return newMap; // Return the updated map
    });
  };

  return (
    <div className="flex flex-col min-w-64 m-4 p-6 bg-white border border-gray-200 rounded-2xl items-center justify-center cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300">
      {/* Product Image */}
      <img
        src={product.imageUrl}
        className="h-40 w-40 object-cover rounded-lg mb-4"
        alt={product.name}
      />

      {/* Product Details */}
      <div className="flex flex-col text-center">
        <h5 className="font-semibold text-gray-900 text-xl mb-2">{product.name}</h5>
        <p className="text-gray-600 text-sm">
          <span className="text-green-600 font-bold">⟨₹⟩{product.pricePerBag}</span>
        </p>

        {/* Quantity Selector */}
        <div className="flex justify-center items-center mt-4 space-x-4">
          <button
            className="bg-red-500 text-white h-8 w-8 rounded-full shadow-md hover:bg-red-600 active:scale-90 transition-transform"
            onClick={removeProduct}
          >
            -
          </button>
          <span className="font-medium text-gray-700 text-lg">
            {product.quantityInCount}
          </span>
          <button
            className="bg-blue-500 text-white h-8 w-8 rounded-full shadow-md hover:bg-blue-600 active:scale-90 transition-transform"
            onClick={increaseProduct}
          >
            +
          </button>
        </div>

        {/* Add to Fodder Button */}
        {product.productCanBeAddedToFodder && (
          <div className="mt-4">
            <button
              onClick={
                product.addedToFodder ? handleRemoveFromFodder : handleAddToFodder
              }
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                product.addedToFodder
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-green-500 text-white hover:bg-green-600"
              }`}
            >
              {product.addedToFodder ? "Remove From Fodder" : "Add To Fodder"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductItem;

import React, { useContext, useState } from "react";
import productContext from "./context/ProductContext";
const AddProduct = (props) => {
  const { onClose } = props;
  const [newProduct, setNewProduct] = useState({name:"", imageUrl:"https://www.nicepng.com/png/detail/257-2574100_kamdhenu-cow-with-calf-working-animal.png", pricePerKg:0,pricePerBag:0, weightOfBag:0,category:"", descripion:"", isFodderIngredient:false, productCanBeAddedToFodder:false, isWhole:false, totalAvailableCount:0, totalAvailableWeight:0});
  const productCtx = useContext(productContext);
  const {addProduct} = productCtx;
  const handleBooleanChange = (e) => {
    setNewProduct((prevProduct) => {
      let nProduct = prevProduct;
      if (e.target.name === "isWhole") {
        nProduct = { ...prevProduct, isWhole: e.target.checked };
      } else if (e.target.name === "isFodderIngredient") {
        nProduct = { ...prevProduct, isFodderIngredient: e.target.checked };
        if (nProduct.isFodderIngredient) {
          nProduct = {
            ...nProduct,
            productCanBeAddedToFodder: !e.target.checked,
          };
        }
      } else {
        nProduct = { ...prevProduct, [e.target.name]: e.target.checked };
      }
      return nProduct;
    });
  };

  const handleInputChange = (e) => {
    setNewProduct((prevProduct) => {
      const newProduct = { ...prevProduct, [e.target.name]: e.target.value };
      return newProduct;
    });
  };

  const handleSaveClick = () => {
    addProduct(newProduct);
    onClose();
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">
        New Product Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="font-medium text-gray-600 mb-1">Product Name</label>
          <input
            name="name"
            type="text"
            onChange={handleInputChange}
            value={newProduct.name}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-gray-600 mb-1">Category</label>
          <input
            name="category"
            type="text"
            onChange={handleInputChange}
            value={newProduct.category}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col md:col-span-2">
          <label className="font-medium text-gray-600 mb-1">Description</label>
          <input
            name="description"
            type="text"
            onChange={handleInputChange}
            value={newProduct.description}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            name="isWhole"
            type="checkbox"
            onChange={handleBooleanChange}
            value={newProduct.isWhole}
            checked={newProduct.isWhole}
            className="h-4 w-4 border-gray-300 focus:ring-blue-500"
          />
          <label className="font-medium text-gray-600">Whole Product</label>
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-gray-600 mb-1">Price Per Kg</label>
          <input
            name="pricePerKg"
            type="number"
            onChange={handleInputChange}
            value={newProduct.pricePerKg}
            disabled={newProduct.isWhole}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-gray-600 mb-1">Price Per Bag</label>
          <input
            name="pricePerBag"
            type="number"
            onChange={handleInputChange}
            value={newProduct.pricePerBag}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-gray-600 mb-1">Weight of Bag</label>
          <input
            name="weightOfBag"
            type="number"
            onChange={handleInputChange}
            value={newProduct.weightOfBag}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            name="isFodderIngredient"
            type="checkbox"
            value={newProduct.isFodderIngredient}
            onChange={handleBooleanChange}
            checked={newProduct.isFodderIngredient}
            className="h-4 w-4 border-gray-300 focus:ring-blue-500"
          />
          <label className="font-medium text-gray-600">Fodder Ingredient</label>
        </div>
        <div className="flex items-center gap-2">
          <input
            name="productCanBeAddedToFodder"
            type="checkbox"
            value={newProduct.productCanBeAddedToFodder}
            disabled={newProduct.isFodderIngredient}
            onChange={handleBooleanChange}
            checked={newProduct.productCanBeAddedToFodder}
            className="h-4 w-4 border-gray-300 focus:ring-blue-500 disabled:bg-gray-200"
          />
          <label className="font-medium text-gray-600">
            Fodder Supplement
          </label>
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-gray-600 mb-1">
            Total Available Count
          </label>
          <input
            name="totalAvailableCount"
            type="number"
            onChange={handleInputChange}
            value={newProduct.totalAvailableCount}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-gray-600 mb-1">
            Total Available Weight
          </label>
          <input
            name="totalAvailableWeight"
            type="number"
            onChange={handleInputChange}
            value={newProduct.totalAvailableWeight}
            disabled={newProduct.isWhole}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
          />
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={handleSaveClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddProduct;

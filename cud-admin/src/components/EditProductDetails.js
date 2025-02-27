import React, { useContext, useState } from "react";
import productContext from "./context/ProductContext";

const EditProductDetails = (props) => {
  const { onClose, product } = props;
  const [editProduct, setEditProduct] = useState(product);
  const productCtx = useContext(productContext);
  const {replaceProduct} = productCtx;
  const handleBooleanChange = (e) => {
    setEditProduct((prevProduct) => {
      let newProduct = prevProduct;
      if (e.target.name === "isWhole") {
        newProduct = { ...prevProduct, isWhole: e.target.checked };
      } else if (e.target.name === "isFodderIngredient") {
        newProduct = { ...prevProduct, isFodderIngredient: e.target.checked };
        if (newProduct.isFodderIngredient) {
          newProduct = {
            ...newProduct,
            productCanBeAddedToFodder: !e.target.checked,
          };
        }
      } else {
        newProduct = { ...prevProduct, [e.target.name]: e.target.checked };
      }
      return newProduct;
    });
  };

  const handleInputChange = (e) => {
    setEditProduct((prevProduct) => {
      const newProduct = { ...prevProduct, [e.target.name]: e.target.value };
      return newProduct;
    });
  };

  const handleSaveClick = () => {
    replaceProduct(editProduct);
    onClose();
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">
        Edit Product Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="font-medium text-gray-600 mb-1">Product Name</label>
          <input
            name="name"
            type="text"
            onChange={handleInputChange}
            value={editProduct.name}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-gray-600 mb-1">Category</label>
          <input
            name="category"
            type="text"
            onChange={handleInputChange}
            value={editProduct.category}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col md:col-span-2">
          <label className="font-medium text-gray-600 mb-1">Description</label>
          <input
            name="description"
            type="text"
            onChange={handleInputChange}
            value={editProduct.description}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            name="isWhole"
            type="checkbox"
            onChange={handleBooleanChange}
            value={editProduct.isWhole}
            checked={editProduct.isWhole}
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
            value={editProduct.pricePerKg}
            disabled={editProduct.isWhole}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-gray-600 mb-1">Price Per Bag</label>
          <input
            name="pricePerBag"
            type="number"
            onChange={handleInputChange}
            value={editProduct.pricePerBag}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-gray-600 mb-1">Weight of Bag</label>
          <input
            name="weightOfBag"
            type="number"
            onChange={handleInputChange}
            value={editProduct.weightOfBag}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            name="isFodderIngredient"
            type="checkbox"
            value={editProduct.isFodderIngredient}
            onChange={handleBooleanChange}
            checked={editProduct.isFodderIngredient}
            className="h-4 w-4 border-gray-300 focus:ring-blue-500"
          />
          <label className="font-medium text-gray-600">Fodder Ingredient</label>
        </div>
        <div className="flex items-center gap-2">
          <input
            name="productCanBeAddedToFodder"
            type="checkbox"
            value={editProduct.productCanBeAddedToFodder}
            disabled={editProduct.isFodderIngredient}
            onChange={handleBooleanChange}
            checked={editProduct.productCanBeAddedToFodder}
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
            value={editProduct.totalAvailableCount}
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
            value={editProduct.totalAvailableWeight}
            disabled={editProduct.isWhole}
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

export default EditProductDetails;

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import Modal from "../components/Modal";
import EditProductDetails from "../components/EditProductDetails";
import productContext from "../components/context/ProductContext";

const ProductDetails = () => {
  const productCtx = useContext(productContext);
  const {productsArr} = productCtx;
  const { productId } = useParams();
  let product_item = productsArr?.find((item) => item._id === productId);
  useEffect(()=>{product_item = productsArr?.find((item) => item._id === productId);},[productsArr])
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = ()=>{
    setModalVisible(true);
  }
  const hideModal = () =>{
    console.log("hide")
    setModalVisible(false);
  }

  return (
    <div className="max-w-5xl mx-auto mt-12 p-6 sm:p-10 bg-white rounded-2xl shadow-lg border border-gray-200">
      {/* Header */}
      {modalVisible && <Modal><EditProductDetails product={product_item} onClose={hideModal} /></Modal>}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800">{product_item?.name || "Product Name"}</h1>
        <p className="text-sm text-gray-500">{product_item?.category || "Category"}</p>
      </div>

      {/* Image Section */}
      <div className="flex flex-col items-center justify-center mb-12">
        <img
          src={product_item?.imageUrl || "https://via.placeholder.com/400"}
          alt={product_item?.name || "Product Image"}
          className="w-full max-w-md rounded-lg shadow-md border"
        />
        <textarea className="text-md text-center w-full max-w-3xl min-h-40 text-gray-600 mt-4 italic">{product_item?.description || "No description available."}</textarea>
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {product_item?.isWhole === false && (
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-700">Price Per Kg</h2>
            <p className="text-md text-gray-600">{product_item?.pricePerKg || "N/A"}</p>
          </div>
        )}

        <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700">Price Per Bag</h2>
          <p className="text-md text-gray-600">{product_item?.pricePerBag || "N/A"}</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700">Weight of Bag</h2>
          <p className="text-md text-gray-600">{product_item?.weightOfBag || "N/A"}</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700">Total Available</h2>
          <p className="text-md text-gray-600">
            {product_item?.isWhole
              ? product_item?.totalAvailableCount || "N/A"
              : product_item?.totalAvailableWeight || "N/A"}
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700">Fodder Type</h2>
          <p className="text-md text-gray-600">
            {product_item?.isFodderIngredient ? "Fodder Ingredient" : "Fodder Supplement"}
          </p>
        </div>
      </div>

      {/* Edit Button */}
      <div className="flex justify-center mt-12">
        <button
          aria-label="Edit product"
          className="px-8 py-3 text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:ring-4 focus:ring-blue-300 rounded-full shadow-md transition-transform transform hover:scale-105"
          onClick={showModal}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;

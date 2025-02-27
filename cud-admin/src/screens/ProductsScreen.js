import React, { useState, useRef, useContext, useEffect } from 'react';
import ProductItem from '../components/ProductItem';
import Modal from '../components/Modal';
import AddProduct from '../components/AddProduct';
import productContext from '../components/context/ProductContext';
const ProductsScreen = () => {
  const productCtx = useContext(productContext);
  const {productsArr} = productCtx;
  const [searchString, setSearchString] = useState('');
  const [searchedProducts, setSearchedProducts] = useState(productsArr);
  const [showDropdown, setShowDropdown] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(()=>{setSearchedProducts(productsArr)},[productsArr])
  const handleChange = (e) => {
    const str = e.target.value;
    const arr = searchProducts(str);
    setSearchString(str);
    setSearchedProducts(arr);
  };

  const searchProducts = (searchStr) => {
    return productsArr.filter((item) =>
      item.name.toLowerCase().includes(searchStr.toLowerCase())
    );
  };

  const handleFocus = () => setShowDropdown(true);

  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 200); // Optional
  };

  const handleClick = (e) =>{
    console.log("Product", e.target.innerText)
    const arr = searchProducts(e.target.innerText)
    setSearchString(e.target.innerText);
    setSearchedProducts(arr);

  }

  const showModal = () =>{
    setModalVisible(true);
  }
  const hideModal = () =>{
    setModalVisible(false);
  }
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
  {/* Modal */}
  {modalVisible && (
    <Modal>
      <AddProduct onClose={hideModal} />
    </Modal>
  )}

  {/* Search Input */}
  <div className="relative w-full max-w-lg mx-auto mb-6">
    <input
      type="text"
      name="search"
      value={searchString}
      placeholder="Search products..."
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      autoComplete="off"
      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
    />
    {showDropdown && (
      <div className="absolute top-full left-0 w-full bg-white shadow-lg border border-gray-300 rounded-lg mt-2 z-10">
        {searchedProducts.length > 0 ? (
          searchedProducts.map((item) => (
            <button
              key={item._id}
              className="block w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors duration-200"
              onClick={handleClick}
            >
              {item.name}
            </button>
          ))
        ) : (
          <p className="px-4 py-2 text-gray-500">No products found</p>
        )}
      </div>
    )}
  </div>

  {/* Add Product Button */}
  <div className="text-center mb-6">
    <button
      onClick={showModal}
      className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-500 transition duration-200"
    >
      Add New Product
    </button>
  </div>

  {/* Table Header */}
  <div className="grid grid-cols-4 font-bold text-center bg-blue-100 p-4 border-b border-blue-300 rounded-lg">
    <p className="text-gray-700">Product ID</p>
    <p className="text-gray-700">Product Name</p>
    <p className="text-gray-700">Category</p>
    <p className="text-gray-700">Available Quantity</p>
  </div>

  {/* Product List */}
  <div>
    {searchedProducts.map((product) => (
      <ProductItem key={product._id} product={product} />
    ))}
  </div>
</div>

  );
};

export default ProductsScreen;

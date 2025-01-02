import React, { useContext, useState } from "react";
import customerContext from "../context/CustomerContext";
import { useNavigate } from "react-router-dom";

const NewCustomer = () => {
  const [customerObject, setCustomerObject] = useState({
    name: "",
    village: "",
    mobile: "",
    address: "",
    fatherName: "",
  });
  const customerCtx = useContext(customerContext)
  const {addNewCustomer, allCustomers, loginEnteredUser} = customerCtx;
  const [addCustomerScreen, setAddCustomerScreen] = useState(false);
  const [searchDropDown, setSearchDropDown] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const autoFillValues = (customerValue) => {
    setCustomerObject({
      name: customerValue.name,
      village: customerValue.village,
      mobile: customerValue.mobile,
      address: customerValue.address,
      fatherName: customerValue.fatherName,
    });
    setShowDropdown(false);
  };

  const handleChange = (e) => {
    const typedString = e.target.value;
    setCustomerObject((prev) => ({
      name: typedString,
      village: "",
      mobile: "",
      address: "",
      fatherName: "",
    }));
    if (typedString.trim()) {
      const searchArray = findCustomersByName(typedString);
      setSearchDropDown(searchArray);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleAddNewCustomerClick = () => {
    setAddCustomerScreen(false);
    addNewCustomer(customerObject)
    setCustomerObject({
      name: "",
      village: "",
      mobile: "",
      address: "",
      fatherName: "",
    });
  };

  const handleAddOldCustomerClick = () => {
    setAddCustomerScreen(true);
    setCustomerObject({
      name: "",
      village: "",
      mobile: "",
      address: "",
      fatherName: "",
    });
  };

  const findCustomersByName = (searchTerm) => {
    return allCustomers.filter((customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleOrderClick = () => {
    if (customerObject.mobile !== "") {
      const selectedCustomer = allCustomers.filter(
        (customer) =>
          customer.name.toLowerCase() === customerObject.name.toLowerCase() &&
          customer.fatherName.toLowerCase() === customerObject.fatherName.toLowerCase()
      );
  
      
      if (selectedCustomer.length > 0) {
        loginEnteredUser(selectedCustomer[0]); // Assuming loginEnteredUser is a function for logging in a customer
        navigate("/")
      } else {
        console.log("No matching customer found");
      }
    } else {
      console.log("Mobile number is missing");
    }
  };
  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 200); // Delay to allow item selection
  };

  const handleFocus = () => {
    if (addCustomerScreen) {
      setShowDropdown(false);
    } else {
      setSearchDropDown(true);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setCustomerObject((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-6 mt-10 bg-white border border-gray-300 rounded-lg shadow-md">
        <h2 className="mb-6 text-xl font-semibold text-gray-700">
          {addCustomerScreen ? "Add New Customer" : "Select Existing Customer"}
        </h2>
        <div className="relative mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            onChange={addCustomerScreen ? handleInputChange : handleChange}
            id="name"
            type="text"
            autoComplete="off"
            value={customerObject.name}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {showDropdown && (
            <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-10">
              {searchDropDown.map((customer) => (
                <div
                  key={customer.id}
                  onMouseDown={() => autoFillValues(customer)}
                  className="p-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
                >
                  {`${customer.name}, ${customer.fatherName}, ${customer.village}`}
                </div>
              ))}
            </div>
          )}
        </div>
        {["fatherName", "mobile", "village", "address"].map((field) => (
          <div key={field} className="mb-4">
            <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">
              {field.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              id={field}
              type="text"
              autoComplete="off"
              value={customerObject[field]}
              onChange={handleInputChange}
              disabled={!addCustomerScreen}
              className={`mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm ${
                addCustomerScreen ? "focus:ring-blue-500 focus:border-blue-500" : "bg-gray-100"
              } sm:text-sm`}
            />
          </div>
        ))}
      </div>
      <div className="mt-6 flex space-x-4">
        {!addCustomerScreen && (
          <>
            <button className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={handleOrderClick}>
              {`Order for ${customerObject.name}`}
            </button>
            <button
              onClick={handleAddOldCustomerClick}
              className="px-6 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add New Customer
            </button>
          </>
        )}
        {addCustomerScreen && (
          <button
            onClick={handleAddNewCustomerClick}
            className="px-6 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {`Add ${customerObject.name}`}
          </button>
        )}
      </div>
    </div>
  );
};

export default NewCustomer;

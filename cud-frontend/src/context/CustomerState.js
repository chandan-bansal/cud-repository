import React, { useEffect, useState } from "react";
import CustomerContext from "./CustomerContext";
const host = "http://localhost:5000"

const CustomerState = (props) => {
<<<<<<< HEAD
=======
  const host = "https://cud-repository-backend.onrender.com"
>>>>>>> origin/main
  const [allCustomers, setAllCustomers] = useState([]);
  const [loggedInCustomer, setLoggedInCustomer] = useState(() => {
    try {
      const savedCustomer = localStorage.getItem("loggedInCustomer");
      return savedCustomer ? JSON.parse(savedCustomer) : {}; // Fallback to empty object if null
    } catch (e) {
      console.error("Error parsing loggedInCustomer from localStorage:", e);
      return {}; // Fallback to empty object in case of error
    }
  });

  useEffect(() => {
    localStorage.setItem("loggedInCustomer", JSON.stringify(loggedInCustomer));
  }, [loggedInCustomer]);
  useEffect(() => {
    fetchAllCustomers();
  }, []);
  const addNewCustomer = async (customer) => {
    try {
      const response = await fetch(`${host}/customer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer),
      });
      const data = await response.json();
      fetchAllCustomers();
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  };

  const loginEnteredUser = (customerObject) => {
    setLoggedInCustomer(customerObject);
  };

  const fetchAllCustomers = async () => {
    try {
      const response = await fetch(
        `${host}/customer/allCustomers`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      setAllCustomers(data);
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  };
  return (
    <CustomerContext.Provider
      value={{
        addNewCustomer,
        fetchAllCustomers,
        allCustomers,
        loggedInCustomer,
        loginEnteredUser,
      }}
    >
      {props.children}
    </CustomerContext.Provider>
  );
};

export default CustomerState;

import React from "react";
import FodderCartItem from "./FodderCartItem";

const FodderCart = (props) => {
  const { items } = props;

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      {Object.entries(items).length === 0 ? (
        <p className="text-gray-500 text-center">No Fodder Added</p>
      ) : (
        <div className="grid grid-cols-4 gap-4 text-gray-700 font-semibold mb-4">
          <p className="text-center">Fodder</p>
          <p className="text-center">Weight</p>
          <p className="text-center">Price</p>
          <p className="text-center"></p>
        </div>
      )}
      {Object.entries(items).map(([key, value]) => (
        <FodderCartItem key={key} id={key} orderDetails={value} />
      ))}
    </div>
  );
};

export default FodderCart;
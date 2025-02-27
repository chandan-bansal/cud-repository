import React from "react";

const CustomerOrderScreenItem = (props) => {
  const { ingredient } = props;

  return (
    <div className="grid grid-cols-4 gap-6 items-center justify-center py-6 px-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      {/* Ingredient Name */}
      <div>
        <p className="text-center font-semibold text-gray-800">{ingredient?.name}</p>
      </div>

      {/* Price per Unit */}
      {ingredient.isWhole ? (
        <div className="flex flex-col items-center">
          <p className="text-lg font-medium text-gray-600">₹{ingredient?.pricePerBag}</p>
          <span className="text-sm text-gray-500">Per Bag</span>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <p className="text-lg font-medium text-gray-600">₹{ingredient?.pricePerKg}</p>
          <span className="text-sm text-gray-500">Per Kg</span>
        </div>
      )}

      {/* Quantity */}
      {ingredient.isWhole ? (
        <div className="flex flex-col items-center">
          <p className="text-lg font-medium text-gray-600">{ingredient?.quantityInCount}</p>
          <span className="text-sm text-gray-500">Pcs</span>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <p className="text-lg font-medium text-gray-600">{ingredient?.quantityInWeight}</p>
          <span className="text-sm text-gray-500">Kgs</span>
        </div>
      )}

      {/* Total Price */}
      <div className="flex flex-col items-center">
        <p className="text-lg font-semibold text-green-600">₹{ingredient?.totalPrice}</p>
        <span className="text-sm text-gray-500">Total</span>
      </div>
    </div>
  );
};

export default CustomerOrderScreenItem;

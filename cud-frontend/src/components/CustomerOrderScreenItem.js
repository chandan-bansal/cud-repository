import React from 'react'

const CustomerOrderScreenItem = (props) => {
    const {ingredient} = props;
  return (
    <div className="grid grid-cols-4 gap-4 items-center justify-center py-4 px-6 bg-gray-100 rounded-lg shadow-md">
    <div>
      <p className="flex justify-center font-semibold text-gray-700">{ingredient?.ingredient}</p>
    </div>
    <div className="items-center flex justify-center">
      <p>{ingredient?.price}</p>
    </div>
    <div className="items-center flex justify-center">
      <p>{ingredient?.quantity}</p>
    </div>
    <div className="items-center flex justify-center">
      <p className="font-medium text-green-600">{ingredient?.totalPrice}</p>
    </div>
  </div>
  )
}

export default CustomerOrderScreenItem
import React from 'react'

const CustomerDropDownItem = (props) => {
    const {customer, autoFillValues} = props;
  return (
    <div onClick={()=>autoFillValues(customer)} className="cursor-pointer hover:bg-blue-500 hover:text-white">
        <p>{`${customer.name}, ${customer.fatherName?customer.fatherName:""}, ${customer.village?customer.village:""}`}</p>
    </div>
  )
}

export default CustomerDropDownItem
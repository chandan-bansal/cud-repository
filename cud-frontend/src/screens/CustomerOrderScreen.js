import React, { useContext } from "react";
import cartContext from "../context/CartContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomerOrderScreenItem from "../components/CustomerOrderScreenItem";
import orderContext from "../context/OrderContext";
import productContext from "../context/ProductContext";
const CustomerOrderScreen = () => {
  const cartCtx = useContext(cartContext);
  const { getOrder, cartObject } = cartCtx;
  const orderCtx = useContext(orderContext);
  const {setOrderMap, setEditFodderId} = orderCtx;
  const productCtx = useContext(productContext);
  const {updateAddedToFodderForProductList} = productCtx;
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;
  let isCart = false;
  if(pathName.includes("/cart")){
    isCart = true;
  }
  const { order_id, fodder_id } = useParams();
  const targetOrder = getOrder(order_id);
  const targetFodder = targetOrder?.[0]?.order_details?.fodderInCart;
  let fodderComp = targetFodder?.[fodder_id]?.["order"];
  const cartFodder = cartObject?.fodderInCart?.[fodder_id];

  if(isCart){
    fodderComp = cartFodder?.order;
  }
  fodderComp = fodderComp ? fodderComp : {};
  const filteredEntries = Object.entries(fodderComp)
    .filter(([key, value]) => value.quantityInWeight !== 0 || value.quantityInCount !== 0)
    .map(([key, value]) => ({ [key]: value }));

  const filteredData = Object.assign({}, ...filteredEntries);

  const editFodder = () =>{
    let fodderMap = {...fodderComp}
    updateAddedToFodderForProductList(fodderMap);
    setEditFodderId(fodder_id)
    setOrderMap(fodderMap);
    navigate("/editFodder")
  }

  const useThisFormula = () =>{
    let fodderMap = {...fodderComp}
    updateAddedToFodderForProductList(fodderMap);
    setOrderMap(fodderMap);
    navigate("/customizedFodder")
  }
  return (
    <div className="p-8 bg-gray-50 rounded-xl shadow-xl max-w-5xl mx-auto mt-8">
      {/* Header */}
      <div className="grid grid-cols-4 gap-6 items-center justify-center py-5 bg-gray-200 rounded-t-xl">
        <p className="text-center font-semibold text-gray-700 text-lg">
          Ingredients
        </p>
        <p className="text-center font-semibold text-gray-700 text-lg">Price</p>
        <p className="text-center font-semibold text-gray-700 text-lg">
          Quantity
        </p>
        <p className="text-center font-semibold text-gray-700 text-lg">Total</p>
      </div>

      {/* Ingredients Rows */}
      <div className="bg-white rounded-b-xl">
        {Object.entries(filteredData).map(([key, value]) => (
          <CustomerOrderScreenItem key={key} id={key} ingredient={value} />
        ))}
      </div>

      {/* Total Sum */}
      <div className=" flex mt-6 p-4 bg-gray-100 rounded-lg shadow-md text-right justify-between">
        <p className="text-xl font-semibold text-gray-800">
          Total Weight(in kgs):{" "}
          <span className="text-green-600">
            {isCart? cartFodder?.totalWeight:targetFodder?.[fodder_id]?.totalWeight}
          </span>
        </p>
        <p className="text-xl font-semibold text-gray-800">
          Total Sum:{" "}
          <span className="text-green-600">
            {isCart? cartFodder?.totalSum:targetFodder?.[fodder_id]?.totalSum}
          </span>
        </p>
        <button
          className="text-xl font-bold text-white bg-green-600 p-2 rounded-lg"
             onClick={isCart?editFodder:useThisFormula}
        >
          {isCart?"Edit Fodder":"Use this Formula"}
        </button>
      </div>
    </div>
  );
};

export default CustomerOrderScreen;

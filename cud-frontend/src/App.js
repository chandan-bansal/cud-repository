import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import ProductScreen from "./screens/ProductScreen";
import OrderHistory from "./screens/OrderHistory";
import UserHistory from "./screens/UserHistory";
import CustomizedFodder from "./screens/CustomizedFodder";
import OrderState from "./context/OrderState";
import CartState from "./context/CartState";
import Cart from "./screens/Cart";
import ProductState from "./context/ProductState";
import NewCustomer from "./screens/NewCustomer";
import CustomerState from "./context/CustomerState";
import CustomerOrderScreen from "./screens/CustomerOrderScreen";
import OrderDetailScreen from "./screens/OrderDetailScreen";

function App() {
  return (
    <div>
      <BrowserRouter>
      <CustomerState>
      <CartState>
        <OrderState>
          <ProductState>
          
            <Navbar />
            <Routes>
              <Route exact path="/" element={<ProductScreen />} />
              <Route exact path="/orderHistory" element={<OrderHistory />} />
              <Route exact path="/userHistory" element={<UserHistory />} />
              <Route exact path="/cart" element={<Cart/>} />
              <Route exact path="/newCustomer" element={<NewCustomer/>} />
              <Route
                exact
                path="/customizedFodder"
                element={<CustomizedFodder />}
              />
              <Route
                exact
                path="/editFodder"
                element={<CustomizedFodder />}
              />
              <Route
                exact
                path="/reuseFodder"
                element={<CustomizedFodder />}
              />
              <Route path="/orders/:id" element={<OrderHistory/>}/>
              <Route path="/orders/:customer_id/:order_id" element={<OrderDetailScreen/>}/>
              <Route path="/cart/fodder/:fodder_id/details" element={<CustomerOrderScreen/>}/>
              <Route path="/orders/:customer_id/:order_id/fodder/:fodder_id/details" element={<CustomerOrderScreen/>}/>
            </Routes>
          </ProductState>
        </OrderState>
      </CartState>
      </CustomerState>
      </BrowserRouter>
    </div>
  );
}

export default App;

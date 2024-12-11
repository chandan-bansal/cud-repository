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

function App() {
  return (
    <div>
      <CartState>
        <OrderState>
          <ProductState>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route exact path="/" element={<ProductScreen />} />
              <Route exact path="/orderHistory" element={<OrderHistory />} />
              <Route exact path="/userHistory" element={<UserHistory />} />
              <Route exact path="/cart" element={<Cart/>} />
              <Route
                exact
                path="/customizedFodder"
                element={<CustomizedFodder />}
              />
            </Routes>
          </BrowserRouter>
          </ProductState>
        </OrderState>
      </CartState>
    </div>
  );
}

export default App;

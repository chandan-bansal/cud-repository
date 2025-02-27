import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ProductDetails from './screens/ProductDetails';
import ProductsScreen from './screens/ProductsScreen';
import ProductState from './components/context/ProductState';

function App() {
  return (
    <ProductState>
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<ProductsScreen/>}/>
      <Route path="/productDetails/:productId" element={<ProductDetails/>}/>
      </Routes>
    </BrowserRouter>
    </ProductState>

  );
}

export default App;


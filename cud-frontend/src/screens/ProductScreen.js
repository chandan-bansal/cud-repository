import { useContext } from "react";
import Product from "../components/Product";
import productContext from "../context/ProductContext";
const ProductScreen = () => {
  const productCtx = useContext(productContext);
  const {productList} = productCtx
  return (
    <div className="p-2">
      {Object.entries(productList).map(([key, value]) => {
        return <Product key={key} title={key} product={value} />;
      })}
    </div>
  );
};

export default ProductScreen;

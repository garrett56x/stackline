import React, { useEffect } from "react";
import "./ProductDashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "../../features/productsSlice.ts";
import { AppDispatch } from "../../store/store.ts";
import SalesTable from "../../components/SalesTable/SalesTable.tsx";
import SalesGraph from "../../components/SalesGraph/SalesGraph.tsx";
import { ProductsState } from "../../features/productsSlice.ts";

interface RootState {
  data: ProductsState;
}

const ProductDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, status } = useSelector((state: RootState) => state.data);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProductData());
    }
  }, [dispatch, status]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed")
    return <div>Failed to load product. Please try again.</div>;
  if (!products.length) return <div>No products available.</div>;

  const product = products[0];

  return (
    <div className="productDashboard">
      <div className="productDetails section">
        <img src={product.image} alt={product.title} className="productImage" />
        <h2>{product.title}</h2>
        <p className="subtitle">{product.subtitle}</p>
        <div className="tags">
          {product.tags.map((tag, i) => {
            return (
              <div className="tag" key={i}>
                {tag}
              </div>
            );
          })}
        </div>
      </div>
      <div className="productData">
        <div className="productGraph section">
          <SalesGraph sales={product.sales} />
        </div>
        <div className="productTable section">
          <SalesTable sales={product.sales} />
        </div>
      </div>
    </div>
  );
};

export default ProductDashboard;

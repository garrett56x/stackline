import React, { useEffect } from "react";
import "./ProductDashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "../../features/dataSlice.ts";
import { AppDispatch } from "../../store";
import SalesTable from "../../components/SalesTable/SalesTable.tsx";
import SalesGraph from "../../components/SalesGraph/SalesGraph.tsx";

const ProductDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, status } = useSelector((state: any) => state.data);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProductData());
    }
  }, [dispatch, status]);

  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  if (status === "loading") return <div>Loading...</div>;
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
          <div style={{ padding: "0 20px" }}>
            <h2 style={{ fontWeight: "400" }}>Retail Sales</h2>
            <SalesGraph sales={product.sales} />
          </div>
          <div className="months">
            {months.map((month, i) => (
              <div key={i} className="month">
                {month}
              </div>
            ))}
          </div>
        </div>
        <div className="productTable section">
          <SalesTable sales={product.sales} />
        </div>
      </div>
    </div>
  );
};

export default ProductDashboard;

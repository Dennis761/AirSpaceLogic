import React from "react";
import ProductCardModel from "../../Models/ProductCardModel/ProductCardModel.tsx";
import "./ProductLongGridListModel.css";

interface ProductLongGridListModelProps {
  products: any[]; // Массив товаров
  isAuthenticated: boolean;
  isLoading: boolean;
}

const ProductLongGridListModel: React.FC<ProductLongGridListModelProps> = ({
  products,
  isAuthenticated,
  isLoading,
}) => {
  return (
    <div className="grid-long-model-product-grid">
      {products.map((product: any, index: number) => (
        <div
          key={product._id}
          className={`product-long-grid-card-${index % 2 === 0 ? "left" : "right"}`}
        >
          <ProductCardModel
            product={product}
            isAdmin={isAuthenticated}
            categoryTitle=""
          />
        </div>
      ))}
    </div>
  );
};

export default ProductLongGridListModel;

import React from "react";
import ProductCardModel from "../../Models/ProductCardModel/ProductCardModel.tsx";
import "./ProductShortGridListModel.css";

interface ProductShortGridListModelProps {
  products: any[]; 
  isAuthenticated: boolean;
}

const ProductLongGridListModel: React.FC<ProductShortGridListModelProps> = ({
  products,
  isAuthenticated,
}) => {
  return (
    <div className="grid-short-model-product-grid">
      {products.map((product, index) => (
        <div
          key={product.id}
          className={`product-short-grid-card-${index % 2 === 0 ? "left" : "right"}`}
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

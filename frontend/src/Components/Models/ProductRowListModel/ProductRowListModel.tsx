import React from "react";
import ProductRowModel from "../ProductRowModel/ProductRowModel.tsx"; 
import { Product } from "../../../Redux/Reducers/categoryReducer.ts";
import "./ProductRowListModel.css";

interface ProductRowListModelProps {
  products: Product[]; 
  isAuthenticated: boolean;
  categoryTitle: string;
}

const ProductRowListModel: React.FC<ProductRowListModelProps> = ({
  products,
  isAuthenticated,
  categoryTitle,
}) => {
  const productList = Array.isArray(products) ? products : [];

  return (
    <div className="product-row-list">
      {productList.length > 0 ? (
        productList.map((product) => (
          <ProductRowModel
            key={product._id}
            product={product}
            isAdmin={isAuthenticated}
            categoryTitle={categoryTitle}
          />
        ))
      ) : (
        <p className="no-products">Нет доступных товаров</p>
      )}
    </div>
  );
};

export default ProductRowListModel;

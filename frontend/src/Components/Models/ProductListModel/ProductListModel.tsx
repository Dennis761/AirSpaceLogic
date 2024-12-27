import React from 'react';
import './ProductListModel.css';
import ProductCardModel from '../ProductCardModel/ProductCardModel.tsx';
import { Product } from '../../../Redux/Reducers/categoryReducer.ts';

interface ProductListProps {
  key: number;
  categoryTitle: string;
  products: Product[];
  isAdmin: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ categoryTitle, products, isAdmin }) => {
  return (
    <div className="product-list-container">
      <h2
        className="category-title"
        style={{
          '--underline-width': `${categoryTitle.length * 15}px`,
        } as React.CSSProperties}
      >
        {categoryTitle}
      </h2>
      <div className="product-scroll-menu">
  {products.map((product) => (
    <div className="product-item" key={product._id}>
      <ProductCardModel
        product={product}
        isAdmin={isAdmin}
        categoryTitle={categoryTitle}
      />
    </div>
  ))}
</div>
    </div>
  ); 
};

export default ProductList;
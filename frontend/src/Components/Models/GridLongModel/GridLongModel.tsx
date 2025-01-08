import React from 'react';
import './GridLongModel.css';

interface Product {
  id: number;
  name: string;
  price: string;
  titleImage: string;
  hoverImage: string;
  rating: number;
  parametrs: string[];
  comments: number;
}

interface GridLongModelProps {
  product: Product;
}

const GridLongModel: React.FC<GridLongModelProps> = ({ product }) => {
  const { name, price, titleImage, hoverImage, rating, parametrs, comments } = product;

  return (
    <div className="grid-long-model-product-card">
      <div className="grid-long-model-product-image">
        <img src={titleImage} alt={name} className="grid-long-model-main-image" />
        <img src={hoverImage} alt={name} className="grid-long-model-hover-image" />
        <div className="grid-long-model-tags">
          {parametrs.map((param, index) => (
            <span key={index} className={`grid-long-model-tag grid-long-model-${param.toLowerCase()}`}>{param}</span>
          ))}
        </div>
      </div>
      <div className="grid-long-model-product-details">
        <h3 className="grid-long-model-product-name">{name}</h3>
        <div className="grid-long-model-rating">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={`grid-long-model-star ${i < rating ? 'grid-long-model-filled' : ''}`}>★</span>
          ))}
          <span className="grid-long-model-rating-count">({comments})</span>
        </div>
        <div className="grid-long-model-price">Цена: {price} грн</div>
        <button className="grid-long-model-buy-button">Купить</button>
      </div>
    </div>
  );
};

export default GridLongModel;

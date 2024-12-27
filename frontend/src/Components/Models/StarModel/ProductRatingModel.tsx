import React from 'react';
import './ProductRatingModel.css';

type StarRatingProps = {
  rating: number;
  totalStars?: number;
};

const ProductRatingModel: React.FC<StarRatingProps> = ({ rating, totalStars = 5 }) => {
  const stars = [];

  for (let i = 0; i < totalStars; i++) {
    const percentage = Math.min(Math.max(rating - i, 0), 1) * 100;

    stars.push(
      <div key={i} className="star-container">
        <svg className="star-background" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <polygon
            points="12,2 15,9 22,9 17,14 18.5,21 12,17 5.5,21 7,14 2,9 9,9"
            fill="#ccc"
          />
        </svg>
        <svg
          className="star-foreground"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          style={{ clipPath: `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)` }}
        >
          <polygon
            points="12,2 15,9 22,9 17,14 18.5,21 12,17 5.5,21 7,14 2,9 9,9"
            fill="#ffa900"
          />
        </svg>
      </div>
    );
  }

  return <div className="star-rating">{stars}</div>;
};

export default ProductRatingModel;

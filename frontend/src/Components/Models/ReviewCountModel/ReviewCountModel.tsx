import React, { useState } from 'react';
import './ReviewCountModel.css'; 

const ReviewCount = ({ count }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="review-count"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="review-bubble">{count}</span>
      {isHovered && <span className="review-text">ОТЗЫВОВ</span>}
    </div>
  );
};

export default ReviewCount;

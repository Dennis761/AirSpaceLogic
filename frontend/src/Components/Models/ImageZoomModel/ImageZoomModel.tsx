import React, { useState } from 'react';
import './ImageZoomModel.css'; 

interface ImageZoomModelProps {
  imageUrl: string;
  parametrs: string[];
}

const ImageZoomModel: React.FC<ImageZoomModelProps> = ({ imageUrl, parametrs }) => {
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setHoverPosition({ x, y });
  };

  const getLabelColor = (param: string) => {
    switch (param) {
      case 'Хіт Продажу':
        return '#28a745';
      case 'Рекомендовано':
        return '#6f42c1';
      case 'Новий Товар':
        return '#ff6200'; 
      case 'Знижка':
        return 'red'; 
      default:
        return 'gray'; 
    }
  };

  const updatedParametrs = parametrs.filter((param) => param !== 'Discounts');

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div
      className="image-container-zoom"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="zoom-image-labels">
        {updatedParametrs.map((param) => (
          <span
            key={param}
            className="zoom-image-label"
            style={{ backgroundColor: getLabelColor(param) }}
          >
            {param}
          </span>
        ))}
      </div>
      <img
        src={imageUrl}
        alt="Zoomable"
        className={isHovering ? 'image-zoom zoom' : 'image-zoom'}
        style={{
          transformOrigin: `${hoverPosition.x}% ${hoverPosition.y}%`,
        }}
      />
    </div>
  );
};

export default ImageZoomModel;

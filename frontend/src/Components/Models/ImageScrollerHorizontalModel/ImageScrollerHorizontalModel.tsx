import React, { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import './ImageScrollerHorizontalModel.css';

interface ImageScrollerProps {
  images: string[];
  onImageClick: (imageUrl: string) => void;
  
}

const ImageScrollerHorizontalModel: React.FC<ImageScrollerProps> = ({ images, onImageClick }) => {
  const [visibleImages, setVisibleImages] = useState(images.slice(0, 4));
  const [startIndex, setStartIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null); 
  const [activeButton, setActiveButton] = useState<string | null>(null); 

  const handleScrollLeft = () => {
    if (startIndex > 0) {
      const newStartIndex = startIndex - 1;
      setStartIndex(newStartIndex);
      setVisibleImages(images.slice(newStartIndex, newStartIndex + 4));
      setActiveButton('left');
    }
  };

  const handleScrollRight = () => {
    if (startIndex + 4 < images.length) {
      const newStartIndex = startIndex + 1;
      setStartIndex(newStartIndex);
      setVisibleImages(images.slice(newStartIndex, newStartIndex + 4));
      setActiveButton('right'); 
    }
  };

  const handleImageClick = (imageUrl: string, index: number) => {
    setActiveImageIndex(index); 
    onImageClick(imageUrl);
  };

  return (
    <div className="image-scroller-horizontal">
      <button
        onClick={handleScrollLeft}
        className={`scroll-button ${activeButton === 'left' ? 'active' : ''}`}
      >
        <BsChevronCompactLeft size={35}/>
      </button>
      <div className="image-list-horizontal">
        {visibleImages.map((img, index) => (
          <div
            key={index + startIndex}
            className={`image-item ${activeImageIndex === index + startIndex ? 'active' : ''}`}
            onClick={() => handleImageClick(img, index + startIndex)}
          >
            <img src={img} alt={`Image ${index}`} />
          </div>
        ))}
      </div>
      <button
        onClick={handleScrollRight}
        className={`scroll-button ${activeButton === 'right' ? 'active' : ''}`}
      >
        <BsChevronCompactRight size={35} />
      </button>
    </div>
  );
};

export default ImageScrollerHorizontalModel;

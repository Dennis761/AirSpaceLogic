import React, { useState } from "react";
import { BsChevronCompactUp, BsChevronCompactDown } from "react-icons/bs";
import './ImageScrollerVerticalModel.css'

interface ImageScrollerProps {
  images: string[];
  onImageClick: (imageUrl: string) => void; 
}
 
const ImageScrollerVerticalModel: React.FC<ImageScrollerProps> = ({ images, onImageClick }) => {
  const [visibleImages, setVisibleImages] = useState(images.slice(0, 4));
  const [startIndex, setStartIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [activeButton, setActiveButton] = useState<string | null>(null); 

  const handleScrollUp = () => {
    if (startIndex > 0) {
      const newStartIndex = startIndex - 1;
      setStartIndex(newStartIndex);
      setVisibleImages(images.slice(newStartIndex, newStartIndex + 4));
      setActiveButton('up'); 
    }
  };

  const handleScrollDown = () => {
    if (startIndex + 4 < images.length) {
      const newStartIndex = startIndex + 1;
      setStartIndex(newStartIndex);
      setVisibleImages(images.slice(newStartIndex, newStartIndex + 4));
      setActiveButton('down');
    }
  };

  const handleImageClick = (imageUrl: string, index: number) => {
    setActiveImageIndex(index);
    onImageClick(imageUrl);
  };

  return (
    <div className="image-scroller">
      <button
        onClick={handleScrollUp}
        className={`scroll-button ${activeButton === 'up' ? 'active' : ''}`}
      >
        <BsChevronCompactUp size={35}/>
      </button>
      <div className="image-list">
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
        onClick={handleScrollDown}
        className={`scroll-button ${activeButton === 'down' ? 'active' : ''}`}
      >
        <BsChevronCompactDown size={35} />
      </button>
    </div>
  );
};

export default ImageScrollerVerticalModel;

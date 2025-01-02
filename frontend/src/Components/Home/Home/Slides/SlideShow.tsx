import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { fetchSlides, addSlide, removeSlide, nextSlide, prevSlide } from '../../../../Redux/Actions/slideActions.ts';
import { AppDispatch, RootState } from '../../../../Redux/store.ts';
import AddSlideForm from '../../../Forms/AddSlideForm/AddSlideForm.tsx';
import './SlideShow.css';

interface SlideShowProps {
  isAdmin?: boolean;
}

const SlideShow: React.FC<SlideShowProps> = ({ isAdmin }) => {
  const slides = useSelector((state: RootState) => state.slides.slides);
  const currentIndex = useSelector((state: RootState) => state.slides.currentIndex);
  const dispatch: AppDispatch = useDispatch();

  const [showAddSlideForm, setShowAddSlideForm] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, [window.innerWidth]);

  useEffect(() => {
    dispatch(fetchSlides());
  }, [dispatch]);

  useEffect(() => {
    if (slides.length > 0) {
      const intervalId = setInterval(() => {
        dispatch(nextSlide());
      }, 6000);
      return () => clearInterval(intervalId);
    }
  }, [dispatch, slides.length]);

  const handleAddSlide = (mobileImage: File, desktopImage?: File) => {
    setPreviewImage(URL.createObjectURL(mobileImage));
    dispatch(addSlide(mobileImage, desktopImage));
    setShowAddSlideForm(false);
  };

  const handleRemoveSlide = () => {
    if (slides.length >= 1) {
      const fullUrl = slides[currentIndex]?.desktopImage || slides[currentIndex]?.mobileImage;
      const fileName = fullUrl.split('/').pop(); // Извлекаем имя файла
      if (fileName) {
        dispatch(removeSlide(fileName, currentIndex)); // Передаем только имя файла
      }
    }
  };
  
  

  return (
    <div className="slide-show-container">
      {slides.length > 0 && currentIndex < slides.length ? (
        <img
          className="slide-image"
          src={!isMobile ? slides[currentIndex].mobileImage : slides[currentIndex].desktopImage}
          alt={`Slide ${currentIndex + 1}`}
        />
      ) : (
        <p className="no-slides-message">Слайди відсутні</p>
      )}

      {slides.length > 0 && (
        <>
          <Button variant="light" className="prev-button" onClick={() => dispatch(prevSlide())}>
            &#8249;
          </Button>
          <Button variant="light" className="next-button" onClick={() => dispatch(nextSlide())}>
            &#8250;
          </Button>
        </>
      )}

      {isAdmin && (
        <div className="admin-controls">
          <Button variant="danger" onClick={handleRemoveSlide} className="remove-slide-button">
            Видалити слайд
          </Button>
          <Button variant="primary" onClick={() => setShowAddSlideForm(true)} className="add-slide-button">
            Додати слайд
          </Button>
        </div>
      )}

      <AddSlideForm
        show={showAddSlideForm}
        onClose={() => setShowAddSlideForm(false)}
        onSubmit={(mobileImage, desktopImage) => handleAddSlide(mobileImage, desktopImage)}
      />
    </div>
  );
};

export default SlideShow;


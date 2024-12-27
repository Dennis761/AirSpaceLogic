import React, { useRef, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const ImageCropperModal = ({ show, currentField, onClose, onSave }) => {
  const cropperRef = useRef(null);
  const [imageToCrop, setImageToCrop] = useState(null);

  // Функция загрузки изображения
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageToCrop(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const croppedImage = cropper.getCroppedCanvas().toDataURL('image/jpeg');
      onSave(croppedImage, currentField); 
      onClose(); 
    }
  };

  // Удаление изображения
  const handleDeleteImage = () => {
    onSave(null, currentField); 
    onClose(); 
  };

  return (
    <Modal show={show} onHide={onClose} centered className="create-react-crop">
      <Modal.Header closeButton>
        <Modal.Title>Обрезка изображения</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {imageToCrop && (
          <Cropper
            src={imageToCrop}
            initialAspectRatio={1}
            aspectRatio={1}
            guides={false}
            background={false}
            ref={cropperRef}
            viewMode={1}
            dragMode="move"
          />
        )}
        <Button variant="primary" onClick={handleCropComplete} className="crop-complete-button">
          Завершить обрезку
        </Button>
        <Button variant="danger" onClick={handleDeleteImage} className="delete-button">
          Видалити зображення
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default ImageCropperModal;

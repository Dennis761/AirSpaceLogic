import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import './AddSlideForm.css';

interface AddSlideFormProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (mobileImage: File, desktopImage: File) => void;
}

const AddSlideForm: React.FC<AddSlideFormProps> = ({ show, onClose, onSubmit }) => {
  const [mobileImage, setMobileImage] = useState<File | null>(null);
  const [desktopImage, setDesktopImage] = useState<File | null>(null);
  const [mobileImagePreview, setMobileImagePreview] = useState<string | null>(null);
  const [desktopImagePreview, setDesktopImagePreview] = useState<string | null>(null);

  const handleMobileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setMobileImage(file);
      setMobileImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDesktopImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setDesktopImage(file);
      setDesktopImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!mobileImage || !desktopImage) {
      alert('Пожалуйста, загрузите оба изображения.');
      return;
    }

    onSubmit(mobileImage, desktopImage);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} className="slide-loading-wrapper">
      <div className="modal-header-slide-custom">
      <Modal.Title>Додати новий слайд</Modal.Title>
        <button className="slide-close-btn" onClick={onClose}>
          &times;
        </button>
      </div>
      <Modal.Body className="slide-modal-body">
        <Form onSubmit={handleSubmit} className="slide-form">
          <Form.Group controlId="mobileImage" className="slide-form-group mb-3">
            <Form.Label>Загрузить изображение для мобильной версии</Form.Label>
            <input
              type="file"
              accept="image/*"
              onChange={handleMobileImageChange}
              className="slide-form-control"
            />
            {mobileImagePreview && (
              <img src={mobileImagePreview} alt="Preview Mobile" className="image-preview" />
            )}
          </Form.Group>

          <Form.Group controlId="desktopImage" className="slide-form-group mb-3">
            <Form.Label>Загрузить изображение для компьютерной версии</Form.Label>
            <input
              type="file"
              accept="image/*"
              onChange={handleDesktopImageChange}
              className="slide-form-control"
            />
            {desktopImagePreview && (
              <img src={desktopImagePreview} alt="Preview Desktop" className="image-preview" />
            )}
          </Form.Group>

          <Button variant="primary" type="submit" className="slide-button-primary">
            Сохранить изображения
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddSlideForm;


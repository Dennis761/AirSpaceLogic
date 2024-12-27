import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './CreateCategoryForm.css'

interface CreateCategoryFormProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (categoryName: string) => void;
}

const CreateCategoryForm: React.FC<CreateCategoryFormProps> = ({ show, onClose, onSubmit }) => {
  const [categoryName, setCategoryName] = useState('');

  const handleAddCategory = () => {
    if (categoryName.trim()) {
      onSubmit(categoryName);
      setCategoryName('');
      onClose();
    }
  };

  return (
    <Modal show={show} onHide={onClose} className="category-loading-wrapper">
      <div className="modal-header-category-custom">
        <Modal.Title>Додати нову категорію</Modal.Title>
        <button className="category-close-btn" onClick={onClose}>
          &times;
        </button>
      </div>
      <Modal.Body className="category-modal-body">
        <Form onSubmit={(e) => { e.preventDefault(); handleAddCategory(); }} className="category-form">
          <Form.Group controlId="formCategoryName" className="category-form-group mb-3">
            <Form.Label>Назва категорії</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введіть назву категорії"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="category-form-control ml-3"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="category-button-primary">
            Додати категорію
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateCategoryForm;

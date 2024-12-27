import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './CreateSubcatalogForm.css';

interface CreateSubcatalogFormProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (subcatalogName: string) => void;
}

const CreateSubcatalogForm: React.FC<CreateSubcatalogFormProps> = ({ show, onClose, onSubmit }) => {
  const [subcatalogName, setSubcatalogName] = useState('');

  const handleAddSubcatalog = () => {
    if (subcatalogName.trim()) { 
      onSubmit(subcatalogName);
      setSubcatalogName('');
      onClose();
    }
  };

  return (
    <Modal show={show} onHide={onClose} className="subcatalog-loading-wrapper">
      <div className="modal-header-subcatalog-custom">
      <Modal.Title>Додати новий підкаталог</Modal.Title>
        <button className="subcatalog-close-btn" onClick={onClose}>
          &times;
        </button>
      </div>
      <Modal.Body className="subcatalog-modal-body">
        <Form onSubmit={(e) => { e.preventDefault(); handleAddSubcatalog(); }} className="subcatalog-form">
          <Form.Group controlId="formSubcatalogName" className="subcatalog-form-group mb-3">
            <Form.Label>Назва підкаталога</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введіт назву підкаталога"
              value={subcatalogName}
              onChange={(e) => setSubcatalogName(e.target.value)}
              className="subcatalog-form-control ml-3"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="subcatalog-button-primary">
            Додати підкаталог
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateSubcatalogForm;

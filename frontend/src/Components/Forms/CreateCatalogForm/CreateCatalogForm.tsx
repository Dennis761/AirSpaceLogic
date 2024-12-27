import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './CreateCatalogForm.css';

interface CreateCatalogFormProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (catalogName: string) => void;
}

const CreateCatalogForm: React.FC<CreateCatalogFormProps> = ({ show, onClose, onSubmit }) => {
  const [catalogName, setCatalogName] = useState('');

  const handleAddCatalog = () => {
    if (catalogName.trim()) {
      onSubmit(catalogName);
      setCatalogName('');
      onClose();
    }
  };

  return (
    <Modal show={show} onHide={onClose} className="catalog-loading-wrapper">
      <div className="modal-header-catalog-custom">
      <Modal.Title>Додати новий каталог</Modal.Title>
        <button className="catalog-close-btn" onClick={onClose}>
          &times;
        </button>
      </div>
      <Modal.Body className="catalog-modal-body">
        <Form onSubmit={(e) => { e.preventDefault(); handleAddCatalog(); }} className="catalog-form">
          <Form.Group controlId="formCatalogName" className="catalog-form-group mb-3">
            <Form.Label>Назва каталога</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введиіть назву каталога"
              value={catalogName}
              onChange={(e) => setCatalogName(e.target.value)}
              className="catalog-form-control ml-3"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="catalog-button-primary">
            Додати каталог
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateCatalogForm;

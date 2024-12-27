import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineDelete } from 'react-icons/ai';
import './SpecificationsForm.css';

const SpecificationForm = ({ onAddSpecification }) => {
  const [specKey, setSpecKey] = useState('');
  const [specValue, setSpecValue] = useState('');

  const handleAddSpecification = () => {
    if (specKey && specValue) {
      onAddSpecification(specKey, specValue);
      setSpecKey('');
      setSpecValue('');
    }
  };

  return (
    <Form.Group as={Row} className="align-items-center specification-form">
      <Col xs={5}>
        <Form.Control
          type="text"
          placeholder="Назва"
          value={specKey}
          onChange={(e) => setSpecKey(e.target.value)}
          className="spec-input"
        />
      </Col>
      <Col xs={5}>
        <Form.Control
          type="text"
          placeholder="Значение"
          value={specValue}
          onChange={(e) => setSpecValue(e.target.value)}
          className="spec-input"
        />
      </Col>
      <Col xs={2}>
        <Button onClick={handleAddSpecification} className="spec-add-button">
          <AiOutlinePlus />
        </Button>
      </Col>
    </Form.Group>
  );
};

const ShowSpecification = ({ show, handleClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    specifications: {}, 
  });

  const addSpecification = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      specifications: {
        ...prevData.specifications,
        [key]: value,
      },
    }));
  };

  const handleDeleteSpecification = (key) => {
    setFormData((prevData) => {
      const updatedSpecifications = { ...prevData.specifications };
      delete updatedSpecifications[key];
      return { ...prevData, specifications: updatedSpecifications };
    });
  };

  useEffect(() => {
    onSubmit(formData); 
    
  }, [formData]);

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Specifications</Form.Label>
        <SpecificationForm onAddSpecification={addSpecification} />
        <ul className="specifications-list">
          {Object.entries(formData.specifications).map(([key, value]) => (
            <li key={key} className="specification-item">
              <strong>{key}</strong>: {value}
              <AiOutlineDelete
                onClick={() => handleDeleteSpecification(key)}
                className="delete-button"
              />
            </li>
          ))}
        </ul>
      </Form.Group>
    </>
  );
};

export default ShowSpecification;

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendContactForm } from '../../../Redux/Actions/contactActions.ts'; 
import { AppDispatch } from '../../../Redux/store.ts';
import { FORM_SUBMIT_CLOSE } from '../../../Redux/Constants/contactConstants.ts'; 
import './ContactForm.css';

const ContactForm = ({ show, handleClose }) => {
  const dispatch: AppDispatch = useDispatch();
  const { submitted, error } = useSelector((state: any) => state.contactForm);

  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    comment: '',
  });

  useEffect(() => {
    if (submitted) {
      toast.success('Ваш запит надіслано!', {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      const timeout = setTimeout(() => {
        handleClose();
        dispatch({ type: FORM_SUBMIT_CLOSE });
      }, 3000);

      return () => clearTimeout(timeout);
    }

    if (error) {
      toast.error(`Помилка: ${error}`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [submitted, error, handleClose, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(sendContactForm(formData.name, formData.phoneNumber, formData.comment));

    setFormData({
      name: '',
      phoneNumber: '',
      comment: '',
    });
  };

  const handleModalClose = () => {
    handleClose();

    dispatch({ type: FORM_SUBMIT_CLOSE });

    setFormData({
      name: '',
      phoneNumber: '',
      comment: '',
    });
  };

  return (
    <>
      <ToastContainer />
      <Modal show={show} onHide={handleModalClose} centered className="modal-contact-wrapper">
        <div className="modal-header-contact-custom">
        <Modal.Title>Залиште свої дані</Modal.Title>
        
          <button className="contact-close-btn" onClick={handleModalClose}>
            &times;
          </button>
        </div>
        <Modal.Body>
          <Form onSubmit={handleSubmit} className="contact-form">
            <Form.Group controlId="formName" className="mt-3 mb-3">
              <Form.Label>Ваше ім'я</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Введіть ваше ім'я"
                required
                className="custom-contact-input"
              />
            </Form.Group>
            <Form.Group controlId="formPhone" className="mt-3 mb-3">
              <Form.Label>Номер телефона</Form.Label>
              <Form.Control
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                onInput={(e) => {
                  if (!e.currentTarget.value.startsWith('+380')) {
                    e.currentTarget.value = '+380';
                  }
                }}
                placeholder="+380XXXXXXXXX"
                pattern="\+380[0-9]{9}"
                required
                className="custom-contact-input"
              />
              
            </Form.Group>
            <Form.Group controlId="formComment" className="mt-3 mb-3">
              <Form.Label>Комментарій</Form.Label>
              <Form.Control
                type="text"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                placeholder="Введіть коментарій"
                className="custom-contact-input"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="submit-contact-button mt-3">
              Відправити
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ContactForm;



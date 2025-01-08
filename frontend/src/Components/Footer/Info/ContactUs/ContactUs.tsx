import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendContactForm } from '../../../../Redux/Actions/contactActions.ts'; 
import { AppDispatch } from '../../../../Redux/store.ts';
import AdressHorizontal from './AdressHorizontal/AdressHorizontal.tsx';
import AdressVertical from './AdressVertical/AdressVertical.tsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ContactUs.css';

export default function ContactUs() {
  const dispatch: AppDispatch = useDispatch();
  const { submitted, error } = useSelector((state: any) => state.contactForm);

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [comment, setComment] = useState('');

  const [isHorizontal, setIsHorizontal] = useState(window.innerWidth > 820);

  useEffect(() => {
    const handleResize = () => {
      setIsHorizontal(window.innerWidth > 820);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (submitted) { 
      toast.success(`Дякуємо, ${name}! Ми зв'яжемося з вами найближчим часом.`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [submitted, name]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(sendContactForm(name, phoneNumber, comment));
  };

  return (
    <div className="contact-us-container">
      <ToastContainer />
      <div className="info-adress-title">
        <h2>Зв'язатися з нами</h2>
        <p>Наша адреса</p>
      </div>
      {isHorizontal ? <AdressHorizontal /> : <AdressVertical />}
      <div className="form-of-communication">
        <p>Форма зв'язку</p>
      </div>
      <div className="modal-contact-us-wrapper">
        <form onSubmit={handleSubmit} className="contact-us-form">
          <div className="contact-us-form-group">
            <label htmlFor="name" className="review-label">
              Ваше ім'я <span className="review-required">*</span>
            </label>
            <input
              id="formName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ваше ім'я"
              className="custom-contact-us-input"
            />
          </div>
          <div className="contact-us-form-group">
            <label htmlFor="phone" className="review-label">
              Ваш телефон <span className="review-required">*</span>
            </label>
            <input
              id="formPhone"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Ваш номер телефона"
              className="custom-contact-us-input"
            />
          </div>
          <div className="contact-us-form-group">
            <label htmlFor="review" className="review-label">
              Ваш відгук <span className="review-required">*</span>
            </label>
            <textarea
              id="formComment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Відгук"
              className="custom-contact-us-input"
            />
          </div>
          {error && <p className="contact-us-error-message">Ошибка: {error}</p>}
          <button type="submit" className="submit-contact-us-button">
            Відправити
          </button>
        </form>
      </div>
    </div>
  );
}

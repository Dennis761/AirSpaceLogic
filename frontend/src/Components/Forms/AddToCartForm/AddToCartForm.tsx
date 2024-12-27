import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addToCart } from '../../../Redux/Actions/cartActions.ts';
import { sendOrder } from '../../../Redux/Actions/sendRequestActions.ts';
import { AppDispatch, RootState } from '../../../Redux/store.ts';
import './AddToCartForm.css';

interface FormData {
  firstName: string;
  phone: string;
  address: string;
  deliveryMethod: string;
}

interface Errors {
  firstName?: string;
  phone?: string;
  address?: string;
  deliveryMethod?: string;
}

const AddToCartForm = ({ product, show, handleClose }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    phone: '',
    address: '',
    deliveryMethod: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch: AppDispatch = useDispatch();
  const { activeCurrency, currencyRate } = useSelector((state: RootState) => state.currency);

  useEffect(() => {
    if (submitted) {
      toast.success('Швидке замовлення успішно оформлено!', {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      const timeout = setTimeout(() => {
        handleClose();
        setSubmitted(false);
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
  }, [submitted, error, handleClose]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const validateForm = () => {
    const newErrors: Errors = {};
    if (!formData.firstName) newErrors.firstName = 'Будь ласка, введіть ваше ПІБ';
    if (!formData.phone.match(/^\+380\d{9}$/))
      newErrors.phone = 'Будь ласка, введіть номер телефону в форматі +380XXXXXXXXX';
    if (!formData.address) newErrors.address = 'Будь ласка, введіть вашу адресу';
    if (!formData.deliveryMethod) newErrors.deliveryMethod = 'Будь ласка, введіть спосіб доставки';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addToCart(product, quantity));
    toast.success('Товар додано в кошик!', {
      position: 'top-right',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    handleClose();
  };

  const handleQuickOrder = async () => {
    if (!validateForm()) return;

    const savedCurrency = localStorage.getItem("selectedCurrency") || "UAH";

    const orderDetails = {
      products: [{ ...product, quantity }],
      ...formData,
      savedCurrency,
      total: product.price * quantity
    };

    try {
      await dispatch(sendOrder(orderDetails));
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Не вдалося оформити замовлення');
    }
  };

  const getProductPrice = () => {
    const price = product.discount || product.price;
    if (typeof price === 'string') {
      return parseInt(price.replace(/\s/g, ''), 10);
    }
    return price;
  };

  const priceNumber = getProductPrice() / (currencyRate || 1);
  const totalPrice = priceNumber * quantity;

  const formatPrice = (price: number): string => {
    return Math.round(price).toLocaleString('uk-UA');
  };

  const currencySymbol =
    activeCurrency === 'UAH' ? '₴' : activeCurrency === 'USD' ? '$' : '€';

  return (
    <>
      <ToastContainer />
      <Modal show={show} onHide={handleClose} className="centered-modal" aria-labelledby="add-to-cart-modal" centered>
        <div className="modal-header-contact-custom">
          <Modal.Title>Залиште свої дані</Modal.Title>
          <button className="contact-close-btn" onClick={handleClose}>
            &times;
          </button>
        </div>
        <Modal.Body className="add-cart-form-body">
          <div className="add-cart-form-product-details">
            <img src={product.titleImage} alt={product.name} style={{ width: '100px' }} />
            <div className="quantity-and-price-container">
              <p className="quantity-and-price-container-p">{product.name}</p>
              <div className="add-cart-form-quantity-control">
                <Button variant="outline-secondary" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  -
                </Button>
                <span className="add-cart-form-quantity">{quantity}</span>
                <Button variant="outline-secondary" onClick={() => setQuantity(quantity + 1)}>
                  +
                </Button>
              </div>
            </div>
          </div>
          <p className="add-to-cart-form-p">
            В кошику {quantity} {quantity === 1 ? 'товар' : 'товарів'} на {formatPrice(totalPrice)} {currencySymbol}
          </p>
          <Form className="add-cart-form">
            <Form.Group controlId="formFirstName" className="add-cart-form-group">
              <Form.Label>ПІБ</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введіть ваше ПІБ"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              {errors.firstName && <div className="error-text">{errors.firstName}</div>}
            </Form.Group>
            <Form.Group controlId="formPhone" className="add-cart-form-group">
              <Form.Label>Номер телефону</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Введіть номер телефону"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
              {errors.phone && <div className="error-text">{errors.phone}</div>}
            </Form.Group>
            <Form.Group controlId="formAddress" className="add-cart-form-group">
              <Form.Label>Адреса</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введіть вашу адресу"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
              {errors.address && <div className="error-text">{errors.address}</div>}
            </Form.Group>
            <Form.Group controlId="formDeliveryMethod" className="add-cart-form-group">
              <Form.Label>Спосіб доставки</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введіть спосіб доставки"
                name="deliveryMethod"
                value={formData.deliveryMethod}
                onChange={handleInputChange}
                required
              />
              {errors.deliveryMethod && <div className="error-text">{errors.deliveryMethod}</div>}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="add-cart-form-footer">
          <Button variant="primary" onClick={handleSubmit} className="add-cart-form-btn-order">
            Додати в кошик
          </Button>
          <Button variant="success" onClick={handleQuickOrder} className="add-cart-form-btn-block">
            Швидке замовлення
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddToCartForm;

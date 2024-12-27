import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { CiCreditCard1, CiDeliveryTruck } from "react-icons/ci";
import { TbUserFilled } from "react-icons/tb";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendOrder } from "../../../Redux/Actions/sendRequestActions.ts";
import { SEND_ORDER_FORM_CLOSE } from "../../../Redux/Constants/sendRequest.ts";
import { updateCartItemQuantity, removeFromCart } from "../../../Redux/Actions/cartActions.ts";
import { AppDispatch, RootState } from '../../../Redux/store.ts';
import './Checkout.css';

const formatNumberWithSpaces = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const Checkout = () => {
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.cart.products);
  const { success, error } = useSelector((state: RootState) => state.order);
  const { activeCurrency, currencyRate } = useSelector((state: RootState) => state.currency);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    deliveryMethod: 'pickup',
    paymentMethod: 'cash',
    comment: ''
  });

  const savedCurrency = localStorage.getItem("selectedCurrency") || "UAH";

  useEffect(() => {
    if (success) {
      toast.success("Ваше замовлення успішно відправлено!", {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      const timeout = setTimeout(() => {
        dispatch({ type: SEND_ORDER_FORM_CLOSE });
      }, 3000);

      return () => clearTimeout(timeout);
    }

    if (error) {
      toast.error(`Ошибка: ${error}`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [success, error, dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderData = {
      ...formData,
      products,
      total: products.reduce(
        (total, product) => total + (getProductPrice(product) / currencyRate) * product.quantity,
        0
      ),
    };

    dispatch(sendOrder({ ...orderData, savedCurrency }));
  };

  const handleUpdateQuantity = (productId, quantity) => {
    dispatch(updateCartItemQuantity(productId, quantity));
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const getProductPrice = (product) => {
    return product.discount ?? product.price; // Используем discount, если он есть, иначе price
  };

  const formatPrice = (price) => {
    return formatNumberWithSpaces(Math.round(price / currencyRate));
  };

  const currencySymbol =
    activeCurrency === 'UAH' ? '₴' : activeCurrency === 'USD' ? '$' : '€';

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h2>Оформлення замовлення</h2>
      </div>

      {products && products.length > 0 ? (
        <>
          <div className="checkout-order-summary">
            <table>
              <thead>
                <tr>
                  <th>Зображення</th>
                  <th>Назва товару</th>
                  <th>Модель</th>
                  <th>Кіль-ть</th>
                  <th>Ціна за шт.</th>
                  <th>Всього</th>
                  <th>Видалити</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img src={product.titleImage} alt={product.name} />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.model}</td>
                    <td>
                      <div className="checkout-quantity-control">
                        <button
                          className="checkout-quantity-btn"
                          onClick={() => handleUpdateQuantity(product.id, product.quantity - 1)}
                          disabled={product.quantity === 1}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          className="checkout-quantity-input"
                          value={product.quantity}
                          readOnly
                        />
                        <button
                          className="checkout-quantity-btn"
                          onClick={() => handleUpdateQuantity(product.id, product.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>{formatPrice(getProductPrice(product))} {currencySymbol}</td>
                    <td>{formatPrice(getProductPrice(product) * product.quantity)} {currencySymbol}</td>
                    <td>
                      <div className="checkout-trash-icon">
                        <FaTrash onClick={() => handleRemoveFromCart(product.id)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="checkout-total-price">
              Попередня вартість: {formatPrice(products.reduce((total, product) => total + getProductPrice(product) * product.quantity, 0))} {currencySymbol}
              <br />
              Разом: {formatPrice(products.reduce((total, product) => total + getProductPrice(product) * product.quantity, 0))} {currencySymbol}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="checkout-form-wrapper">
            <div className="checkout-form-column-user">
              <div className="checkout-form-title-user">
                <div className="checkout-icon">
                  <TbUserFilled size={25} />
                </div>
                <div>Зареєстрований користувач</div>
              </div>
              <label>Ім'я</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />

              <label>Прізвище</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />

              <label>Телефон</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />

              <label>E-Mail</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />

              <label>Адреса</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} required />
            </div>

            <div className="checkout-product-settle-box">
              <div className="checkout-form-column-delivery">
                <div className="checkout-radio-group">
                  <div className="checkout-delivery-box">
                    <div className="checkout-icon">
                      <CiDeliveryTruck size={25} />
                    </div>
                    <div>Спосіб доставки</div>
                  </div>
                  <label>
                    <input type="radio" name="deliveryMethod" value="pickup" checked={formData.deliveryMethod === 'pickup'} onChange={handleChange} />
                    У відділення (50 грн)
                  </label>
                  <label>
                    <input type="radio" name="deliveryMethod" value="courier" checked={formData.deliveryMethod === 'courier'} onChange={handleChange} />
                    Кур'єрська доставка (200 грн)
                  </label>
                </div>
              </div>

              <div className="checkout-form-column-pay">
                <div className="checkout-radio-group">
                  <div className="checkout-card-box">
                    <div className="checkout-icon">
                      <CiCreditCard1 size={25} />
                    </div>
                    <div>Спосіб оплати</div>
                  </div>
                  <label>
                    <input type="radio" name="paymentMethod" value="cash" checked={formData.paymentMethod === 'cash'} onChange={handleChange} />
                    Накладений платіж
                  </label>
                  <label>
                    <input type="radio" name="paymentMethod" value="bank" checked={formData.paymentMethod === 'bank'} onChange={handleChange} />
                    Банківський переказ
                  </label>
                </div>

                <h4>Коментар до замовлення</h4>
                <textarea
                  className="checkout-comment"
                  name="comment"
                  placeholder="Ви можете додати коментар до свого замовлення"
                  value={formData.comment}
                  onChange={handleChange}
                ></textarea>

                <div className="checkout-total-sum">
                  Сума вашого замовлення: {formatPrice(products.reduce((total, product) => total + getProductPrice(product) * product.quantity, 0))} {currencySymbol}
                </div>

                <button type="submit" className="checkout-submit-btn">
                  Оформлення замовлення
                </button>
              </div>
            </div>
          </form>
        </>
      ) : (
        <div className="checkout-empty-cart">
          <h3>Ваш кошик порожній</h3>
          <p>Будь ласка, додайте товари в кошик, щоб оформити замовлення.</p>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Checkout;

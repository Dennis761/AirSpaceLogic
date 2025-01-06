import React from 'react';
import inversespacelogiclogo from '../../../../../Images/inversespacelogiclogo.png';
import './AdressHorizontal.css';

export default function AdressHorizontal() {
  return (
    <div className="info-adress-container">
      <div className="info-adress-logo-container">
        <img 
          src={inversespacelogiclogo} 
          alt="UkrOptica Логотип" 
          className="info-adress-logo-image" 
        />
      </div>
      <div className="info-adress-details">
        <p>
          <b>UkrOptica</b> - магазин професійної оптики для полювання номер один в Україні
        </p>
        <p>м. Київ, бульвар Лесі Українки 26</p>
      </div>
      <div className="info-adress-contact">
        <p><b>Телефон</b></p>
        <p>+38 (097) 032-78-99</p>
        <p>+38 (050) 831-74-64</p>
      </div>
      <div className="info-adress-working-hours">
        <p><b>Години роботи</b></p>
        <p>Пн-Пт з 10:00 до 18:00</p>
      </div>
      <div className="info-adress-comment">
        <p>
          <b>Увага!</b> У зв'язку з великим асортиментом, не вся продукція є в пункті видачі. 
          Наполегливо рекомендуємо телефонувати та погоджувати наявність, щоб уникнути непорозумінь.
        </p>
      </div>
    </div>
  );
}
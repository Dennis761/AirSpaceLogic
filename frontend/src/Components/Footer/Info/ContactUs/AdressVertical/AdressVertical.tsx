import React from 'react';
import inversespacelogiclogo from '../../../../../Images/inversespacelogiclogo.png';
import './AdressVertical.css'; 

export default function AdressVertical() {
  return (
    <div className="vertical-address-container">
      <div className="vertical-logo-container">
        <img 
          src={inversespacelogiclogo} 
          alt="UkrOptica Логотип" 
          className="vertical-logo-image" 
        />
      </div>
      <div className="vertical-details">
        <p>
          <b>UkrOptica</b> - магазин професійної оптики для полювання номер один в Україні
        </p>
        <p>м. Київ, бульвар Лесі Українки 26</p>
      </div>
      <div className="vertical-contact">
        <p><b>Телефон</b></p>
        <p>+38 (097) 032-78-99</p>
        <p>+38 (050) 831-74-64</p>
      </div>
      <div className="vertical-hours">
        <p><b>Години роботи</b></p>
        <p>Пн-Пт з 10:00 до 18:00</p>
      </div>
      <div className="vertical-comment">
        <p>
          <b>Увага!</b> У зв'язку з великим асортиментом, не вся продукція є в пункті видачі. 
          Наполегливо рекомендуємо телефонувати та погоджувати наявність, щоб уникнути непорозумінь.
        </p>
      </div>
    </div>
  );
}

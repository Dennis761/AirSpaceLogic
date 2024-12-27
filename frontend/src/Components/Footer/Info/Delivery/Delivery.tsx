import React from 'react';
import inversespacelogiclogo from '../../../../Images/inversespacelogiclogo.png';
import './Delivery.css';

export default function Delivery() {
  return (
    <div className="delivery-container">
      <h2 className="delivery-title">Air Space Logic — доставка та оплата</h2>
      <div className="delivery-section">
        <h3 className="delivery-subtitle">Оплата</h3>
        <p className="delivery-description">
          Для оформлення замовлення необхідно здійснити повну оплату на рахунок ФОП (Фізичної особи-підприємця) після
          узгодження деталей та підтвердження замовлення. Це гарантує оперативну обробку вашого запиту та точність у
          виконанні замовлення. Оплата може здійснюватися через банківські перекази або інші доступні платіжні системи,
          про які ми детально інформуємо при оформленні кожного замовлення.
        </p>
      </div>
      <div className="delivery-section">
        <h3 className="delivery-subtitle">Доставка</h3>
        <p className="delivery-description">
          Ми пропонуємо зручні умови доставки по території України, співпрацюючи з перевіреними транспортними компаніями.
          Найбільш рекомендованим варіантом є використання сервісу Нова Пошта, що дозволяє отримати ваше замовлення
          швидко і безпечно. Ви можете обрати зручний для вас спосіб доставки, зокрема за адресою або до найближчого
          відділення.
        </p>
        <p className="delivery-description">
          У разі необхідності доставки іншими транспортними компаніями, ми завжди готові розглянути ваші побажання та
          організувати зручну відправку.
        </p>
      </div>
      <div className="delivery-image-container">
        <img src={inversespacelogiclogo} alt="Air Space Logic Logo" className="delivery-image" />
      </div>
    </div>
  );
}

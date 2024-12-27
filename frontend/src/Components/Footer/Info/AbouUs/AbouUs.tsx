import React from 'react';
import inversespacelogiclogo from '../../../../Images/inversespacelogiclogo.png';
import './AboutUs.css';

export default function AboutUs() {
  return (
    <div className="about-us-container">
      <h2 className="about-us-title">Air Space Logic — про нас</h2>
      <p className="about-us-description">
        Air Space Logic — український виробник безпілотних літальних апаратів (БПЛА) та комплексів БпАК. Ми
        спеціалізуємося на виготовленні квадрокоптерів, дронів літакового типу та засобів радіоелектронної боротьби.
        З перших днів війни ми активно співпрацюємо з волонтерами, Територіальною обороною, Збройними силами України,
        СБУ, ГУР та ССО.
      </p>
      <p className="about-us-description">
        Наше виробництво постійно проводить тестові польоти, що дозволяє нам забезпечити найвищу якість продукції. Ми
        також маємо штат сертифікованих інструкторів, які проводять навчання для військових та інших користувачів щодо
        правильного використання квадрокоптерів та БПЛА. Всі наші вироби пройшли випробування в бойових умовах, отримали
        позитивні відгуки та подяки від різних військових частин.
      </p>
      <div className="about-us-image-container">
        <img src={inversespacelogiclogo} alt="Air Space Logic Logo" className="about-us-image" />
      </div>
    </div>
  );
}

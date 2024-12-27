import React from 'react';
import inversespacelogiclogo from '../../../../Images/inversespacelogiclogo.png';
import './Guarantee.css';

export default function Guarantee() {
  return (
    <div className="guarantee-container">
      <h2 className="guarantee-title">Air Space Logic — гарантія</h2>
      <p className="guarantee-description">
        Ми надаємо гарантію на всі наші вироби терміном на один рік з моменту покупки. Протягом цього періоду, у разі
        виникнення дефектів, що не пов’язані з неправильним використанням чи пошкодженням, ми здійснюємо безкоштовний
        ремонт або заміну виробу. Гарантія діє за умови правильного використання продукції відповідно до наданих
        інструкцій та рекомендацій.
      </p>
      <p className="guarantee-description">
        Завжди уважно перевіряйте товар при отриманні, і якщо виникли будь-які питання чи зауваження щодо його
        функціональності, звертайтеся до нас, і ми оперативно вирішимо проблему. Наш сервіс завжди готовий допомогти вам
        у разі будь-яких неполадок.
      </p>
      <p className="guarantee-description">
        Таким чином, з нами ви можете бути впевнені не лише в якості продукції, а й у надійності сервісного
        обслуговування на протязі року після покупки.
      </p>
      <div className="guarantee-image-container">
        <img src={inversespacelogiclogo} alt="Air Space Logic Logo" className="guarantee-image" />
      </div>
    </div>
  );
}

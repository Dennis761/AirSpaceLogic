import React from 'react';
import inversespacelogiclogo from '../../../../Images/inversespacelogiclogo.png';
import './Manufacturers.css';

export default function Manufacturers() {
  return (
    <div className="manufacturers-container">
      <h2 className="manufacturers-title">Air Space Logic — виробництво</h2>
      <p className="manufacturers-description">
        Ми пропонуємо широкий асортимент FPV дронів камікадзе, що охоплюють різні модифікації та завдання. Наші
        виробничі потужності дозволяють виготовляти до 5000 одиниць на місяць. Крім того, ми активно співпрацюємо з
        військовими, благодійними фондами та маємо як оптову, так і роздрібну торгівлю нашими продуктами.
      </p>
      <p className="manufacturers-description">
        З Air Space Logic ви можете бути впевнені у високій якості та надійності кожного виробу, що служить на благо
        України та її безпеки.
      </p>
      <p className="manufacturers-brands">
        <strong>Виробники:</strong> DJI, Autel, Air Space Logic, Українське виробництво «ТЕХ ПРОМ»
      </p>
      <div className="manufacturers-image-container">
        <img src={inversespacelogiclogo} alt="Air Space Logic Logo" className="manufacturers-image" />
      </div>
    </div>
  );
}

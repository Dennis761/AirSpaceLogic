import React from 'react';
import './Suggestion.css'; 
import payment from '../../../../Images/payment.png'
import deliver from '../../../../Images/deliver.png'
import bestPrice from '../../../../Images/bestPrice.png'
import support from '../../../../Images/support.png'

export default function Suggestion() {
  const handleImageError = (event) => {
    event.target.src = "https://fallbackimage.url"; 
  };

  return (
    <div className="banner-blocks-container">
      <div className="grid-item grid-item-1">
        <div className="banner-item">
          <div className="banner-image">
            <img 
              alt="Найкраща ціна" 
              src={bestPrice} 
              onError={handleImageError}
            />
          </div>
          <div className="banner-info">
            <div className="banner-title">Найкраща ціна</div>
            <div className="banner-description">Найвигідніші пропозиції в Україні</div>
          </div>
        </div>
      </div>

      <div className="grid-item grid-item-2">
        <div className="banner-item">
          <div className="banner-image">
            <img 
              alt="Завжди на зв'язку" 
              src={support} 
              onError={handleImageError}
            />
          </div>
          <div className="banner-info">
            <div className="banner-title">Завжди на зв'язку</div>
            <div className="banner-description">Ми працюємо 24 години 7 днів на тиждень</div>
          </div>
        </div>
      </div>

      <div className="grid-item grid-item-3">
        <div className="banner-item">
          <div className="banner-image">
            <img 
              alt="Швидка доставка" 
              src={deliver} 
              onError={handleImageError}
            />
          </div>
          <div className="banner-info">
            <div className="banner-title">Швидка доставка</div>
            <div className="banner-description">Відправлення товару в день замовлення</div>
          </div>
        </div>
      </div>

      <div className="grid-item grid-item-4">
        <div className="banner-item">
          <div className="banner-image">
            <img 
              alt="Безпечна покупка" 
              src={payment} 
              onError={handleImageError}
            />
          </div>
          <div className="banner-info">
            <div className="banner-title">Безпечна покупка</div>
            <div className="banner-description">Ми гарантуємо безпечну оплату</div>
          </div>
        </div>
      </div>
    </div>
    
  );
}

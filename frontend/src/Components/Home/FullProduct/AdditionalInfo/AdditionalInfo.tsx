import React from 'react'
import ProductRatingModel from '../../../Models/StarModel/ProductRatingModel.tsx'
import './AdditionalInfo.css'

export default function AdditionalInfo({isAvailable, manufacturer, rating}) {
  return (
    <div className='additional-info-container'>
        <div className="availability">
          Доступность: 
          <span className={isAvailable ? 'available' : 'unavailable'}>
            {isAvailable ? 'Есть в наличии' : 'Нет в наличии'}
          </span>
          <div className="rating-container">
            <ProductRatingModel rating={rating}/>
          </div>
        </div>
        <div>
          Производитель: <span>{manufacturer}</span>
        </div>
      </div>
  )
}

import React from 'react'
import ProductRatingModel from '../../../Models/StarModel/ProductRatingModel.tsx'
import './AdditionalInfo.css'

export default function AdditionalInfo({isAvailable, manufacturer, rating}) {
  return (
    <div className='additional-info-container'>
        <div className="availability">
          Доступність: 
          <span className={isAvailable ? 'available' : 'unavailable'}>
            {isAvailable ? 'Є в наявності' : 'Немає в наявності'}
          </span>
          <div className="rating-container">
            <ProductRatingModel rating={rating}/>
          </div>
        </div>
        <div className='manufacturer'>
          Виробник: <span>{manufacturer}</span>
        </div>
      </div>
  )
}

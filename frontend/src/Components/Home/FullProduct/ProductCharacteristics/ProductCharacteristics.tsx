import React from 'react';
import './ProductCharacteristics.css';

interface ProductDescriptionProps {
    specifications: Record<string, string | number | boolean>;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ specifications }) => {
    return (
        <div className="product-description">
            <h2>Общие характеристики</h2>
            <ul>
                {Object.keys(specifications).map((key) => (
                    <li key={key} className="description-item">
                        <span className="parameter">{key}</span>
                        <span className="dots"></span>
                        <span className="value">
                            {typeof specifications[key] === 'boolean'
                                ? specifications[key] ? 'Да' : 'Нет'
                                : specifications[key]}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductDescription;

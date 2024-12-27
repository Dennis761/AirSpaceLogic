import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../../Redux/Actions/cartActions.ts';
import { RootState } from '../../../../Redux/store.ts';
import './ProductPurchase.css';

interface ProductPurchaseProps {
    price: string;
    discount: string;
    isAvailable: boolean;
    product: any;
}

const ProductPurchase: React.FC<ProductPurchaseProps> = ({
    price,
    discount,
    isAvailable,
    product
}) => {
    const dispatch = useDispatch();
    const { activeCurrency, currencyRate } = useSelector((state: RootState) => state.currency);

    const calculateDiscountPercentage = (price: string, discount: string) => {
        const priceNum = parseFloat(price.replace(/\s/g, ''));
        const discountNum = parseFloat(discount.replace(/\s/g, ''));
        if (!priceNum || !discountNum || priceNum <= discountNum) return null;
        return Math.round(((priceNum - discountNum) / priceNum) * 100);
    };

    const formatPrice = (price: number): string => {
        return Math.round(price).toLocaleString('ru-RU');
    };

    const convertPrice = (price: string): number => {
        const priceNum = parseFloat(price.replace(/\s/g, ''));
        return priceNum / (currencyRate || 1);
    };

    const discountPrice = convertPrice(discount);
    const originalPrice = convertPrice(price);

    const discountPercentage = calculateDiscountPercentage(price, discount);

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    };

    const currencySymbol =
        activeCurrency === 'UAH' ? '₴' : activeCurrency === 'USD' ? '$' : '€';

    return (
        <div className="product-purchase">
            <div className="price-info">
                <div className="current-price">
                    {discountPercentage !== null ? (
                        <>
                            <span className="disconted-price">
                                <span style={{ fontWeight: 'bold', fontSize: '45px' }}>{formatPrice(discountPrice)}</span>
                                <span style={{marginRight: '12px'}}> {currencySymbol}</span>
                            </span>
 
                            <span className="old-price">{formatPrice(originalPrice)} {currencySymbol}</span>
                            <div className="discount-block">
                                <span>Ваша скидка: </span>
                                <span className="discount-percentage">-{discountPercentage}%</span>
                            </div>
                        </>
                    ) : ( 
                        <span >{formatPrice(originalPrice)} {currencySymbol}</span>
                    )}
                </div>
            </div>
            
            <button className="buy-button" disabled={!isAvailable} onClick={handleAddToCart}>
                <FaShoppingCart className="product-cart-icon" />
                <span >
                    В корзину
                </span>
            </button>
        </div>
    );
};

export default ProductPurchase;

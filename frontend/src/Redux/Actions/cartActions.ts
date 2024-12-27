import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_ITEM_QUANTITY } from '../Constants/cartConstants.ts';

export const addToCart = (product, quantity = 1) => {
  console.log('product, quantity', product, quantity)
  return {
    type: ADD_TO_CART,
    payload: {
      ...product,
      quantity,
    },
  };
};

export const removeFromCart = (productId) => {
  return {
    type: REMOVE_FROM_CART,
    payload: productId,
  };
};

export const updateCartItemQuantity = (productId, quantity) => {
  return {
    type: UPDATE_CART_ITEM_QUANTITY,
    payload: { productId, quantity },
  };
};

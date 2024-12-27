import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_ITEM_QUANTITY } from '../Constants/cartConstants.ts';

const initialState = {
  products: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingProduct = state.products.find(product => product._id === action.payload._id);
      if (existingProduct) {
        return {
          ...state,
          products: state.products.map(product =>
            product.id === action.payload.id
              ? { ...product, quantity: product.quantity + action.payload.quantity }
              : product
          ),
        };
      }

      return {
        ...state,
        products: [...state.products, action.payload],
      };
      
    case REMOVE_FROM_CART:
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload),
      };
    
    case UPDATE_CART_ITEM_QUANTITY:
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.productId
            ? { ...product, quantity: action.payload.quantity }
            : product
        ),
      };

    default:
      return state;
  }
};

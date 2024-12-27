// Redux/Reducers/productReducer.ts
import {
    FETCH_PRODUCT_REQUEST,
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCT_FAILURE,
  } from '../Constants/productConstants.ts';
  
  interface ProductState {
    loading: boolean;
    product: null | any;
    error: null | string;
  }
  
  const initialState: ProductState = {
    loading: false,
    product: null,
    error: null,
  };
  
  export const productReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case FETCH_PRODUCT_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_PRODUCT_SUCCESS:
        return { ...state, loading: false, product: action.payload };
      case FETCH_PRODUCT_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
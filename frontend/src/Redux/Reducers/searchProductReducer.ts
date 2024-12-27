import {
  PRODUCT_SEARCH_REQUEST,
  PRODUCT_SEARCH_SUCCESS,
  PRODUCT_SEARCH_FAIL,
} from "../Constants/searchProductConstants.ts";

const initialState = {
  products: [],      
  loading: false,    
  error: null,       
  hasMore: true,     
  currentPage: 1,    
};

export const searchProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case PRODUCT_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.currentPage === 1
          ? action.payload.products 
          : [...state.products, ...action.payload.products], 
        hasMore: action.payload.hasMore,
        currentPage: action.payload.currentPage,
      };

    case PRODUCT_SEARCH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

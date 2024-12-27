import { SEND_ORDER_REQUEST, SEND_ORDER_SUCCESS, SEND_ORDER_FAILURE, SEND_ORDER_FORM_CLOSE } from '../Constants/sendRequest.ts';

const initialState = {
  loading: false,
  success: false,
  error: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_ORDER_REQUEST:
      return { ...state, loading: true, success: false, error: null };
    case SEND_ORDER_SUCCESS:
      return { ...state, loading: false, success: true, error: null };
    case SEND_ORDER_FORM_CLOSE:
      return { ...state, loading: false, success: false, error: null };
    case SEND_ORDER_FAILURE:
      return { ...state, loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

import axios from 'axios';
import { SEND_ORDER_REQUEST, SEND_ORDER_SUCCESS, SEND_ORDER_FAILURE } from '../Constants/sendRequest.ts';


export const sendOrder = (orderData) => async (dispatch) => {
  dispatch({ type: SEND_ORDER_REQUEST });

  console.log(orderData)
  try {
    const response = await axios.post('/sendOrderToTelegram', orderData);

    dispatch({ type: SEND_ORDER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: SEND_ORDER_FAILURE, payload: error.message });
  }
};


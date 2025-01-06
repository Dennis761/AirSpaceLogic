import axios from 'axios';
import { FORM_SUBMIT_SUCCESS, FORM_SUBMIT_FAILURE } from '../Constants/contactConstants.ts';

export const sendContactForm = (name, phoneNumber, comment) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/sendToTelegram', { name, phoneNumber, comment });

      dispatch({ type: FORM_SUBMIT_SUCCESS });
    } catch (error) {
      dispatch({ type: FORM_SUBMIT_FAILURE, payload: error.message });
      console.error('Ошибка при отправке формы:', error.message);
    }
  };
};

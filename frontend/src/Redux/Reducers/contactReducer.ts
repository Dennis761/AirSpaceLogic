import { FORM_SUBMIT_SUCCESS, FORM_SUBMIT_FAILURE, FORM_SUBMIT_CLOSE } from '../Constants/contactConstants.ts';

const initialState = {
  submitted: false, 
  error: null,      
};

export const contactFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORM_SUBMIT_SUCCESS:
      return {
        ...state,
        submitted: true, 
        error: null,    
      };
    case FORM_SUBMIT_FAILURE:
      return {
        ...state,
        submitted: false,
        error: action.payload,
      };
    case FORM_SUBMIT_CLOSE:
      return {
        ...state,
        submitted: false, 
        error: null,      
      };
    default:
      return state; 
  }
};

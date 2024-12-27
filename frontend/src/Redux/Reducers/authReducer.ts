import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
  } from '../Constants/authConstants.ts';
  
  const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
  };
  
  export const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
        return { ...state, loading: true };
      case LOGIN_SUCCESS:
        return { ...state, isAuthenticated: true, loading: false, user: action.payload };
      case LOGIN_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case LOGOUT:
        return { ...state, isAuthenticated: false, user: null };
      default:
        return state;
    }
  };
  
import axios from 'axios';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from '../Constants/authConstants.ts';

export const login = (email: string, password: string) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const response = await axios.post('/api/auth/login-admin', { email, password });

    if(response.data){
      localStorage.setItem("liga-fpv-token", response.data.token)
    }
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.response ? error.response.data.message : error.message });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
  localStorage.removeItem("liga-fpv-token")
};

import axios from 'axios';
import { AppDispatch } from '../store';
import {
    FETCH_COMMENTS_REQUEST,
    FETCH_COMMENTS_SUCCESS,
    FETCH_COMMENTS_FAILURE,
    ADD_COMMENT_SUCCESS,
  } from '../Constants/commentConstants.ts';

export const fetchComments = (productId: string) => async (dispatch: AppDispatch) => {
  dispatch({ type: FETCH_COMMENTS_REQUEST });

  try {
    const { data } = await axios.get(`/api/comments/${productId}/comments`);
    dispatch({ type: FETCH_COMMENTS_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({ type: FETCH_COMMENTS_FAILURE, payload: error.message });
  }
};

export const addComment = (productId: string, name: string, commentData: any) => async (dispatch: AppDispatch) => {
  try {
    const { data } = await axios.post(`/api/comments/${productId}/comments`, {...commentData, name});
    dispatch({ type: ADD_COMMENT_SUCCESS, payload: data.comment });
  } catch (error) {
    console.error('Ошибка при добавлении комментария:', error);
  }
};

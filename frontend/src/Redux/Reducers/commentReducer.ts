import {
    FETCH_COMMENTS_REQUEST,
    FETCH_COMMENTS_SUCCESS,
    FETCH_COMMENTS_FAILURE,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FORM_CLOSE
  } from '../Constants/commentConstants.ts';
  
  interface CommentState {
    loading: boolean;
    success: boolean;
    comments: any[];
    error: string | null;
  }
  
  const initialState: CommentState = {
    loading: false,
    success: false,
    comments: [],
    error: null,
  };
  
  export const commentReducer = (state = initialState, action: any): CommentState => {
    switch (action.type) {
      case FETCH_COMMENTS_REQUEST:
        return { ...state, loading: true, success: false };
      case FETCH_COMMENTS_SUCCESS:
        return { ...state, loading: false, comments: action.payload, error: null, success: false };
      case FETCH_COMMENTS_FAILURE:
        return { ...state, loading: false, error: action.payload, success: false };
      case ADD_COMMENT_FORM_CLOSE:
        return { ...state, loading: false, error: null, success: false };
      case ADD_COMMENT_SUCCESS:
        return { ...state, comments: [...state.comments, action.payload], success: true };
      default:
        return state;
    }
  };
  
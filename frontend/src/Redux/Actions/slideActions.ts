import axios from 'axios';
import { ADD_SLIDE, REMOVE_SLIDE, FETCH_SLIDES_SUCCESS, FETCH_SLIDES_FAILURE, NEXT_SLIDE, PREV_SLIDE } from '../Constants/slideConstants.ts';

export const fetchSlides = () => async (dispatch: any) => {
  try {
    const response = await axios.get('/api/slides'); 
    dispatch({
      type: FETCH_SLIDES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_SLIDES_FAILURE,
      payload: error.message,
    });
  }
};

export const addSlide = (mobileImage: File, desktopImage: File) => async (dispatch: any) => {
  try {
    const token = localStorage.getItem('liga-fpv-token');
      if (!token) {
        throw new Error('Token not found in local storage');
      }

   let data = new FormData();
    data.append('folder', 'SlidesProductImages');
    data.append('mobileImage', mobileImage);
    data.append('desktopImage', desktopImage);

    const response = await axios.post('/api/slides', data, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
      
    dispatch({
      type: ADD_SLIDE,
      payload: response.data.banner,
    });
  } catch (error) {
    console.error('Ошибка при добавлении слайда:', error);
  }
};

export const removeSlide = (name: string, id: string) => async (dispatch: any) => {
  try {
    const token = localStorage.getItem('liga-fpv-token');
        if (!token) {
          throw new Error('Token not found in local storage');
        }

        const response = await axios.delete(`/api/slides/${name}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    dispatch({
      type: REMOVE_SLIDE,
      payload: id,
    });
  } catch (error) {
    console.error('Ошибка при удалении слайда:', error);
  }
};

export const nextSlide = () => ({
  type: NEXT_SLIDE,
});

export const prevSlide = () => ({
  type: PREV_SLIDE,
});


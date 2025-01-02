import axios from 'axios';
import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  ADD_CATEGORY,
  REMOVE_CATEGORY,
  ADD_PRODUCT_TO_CATEGORY,
  REMOVE_PRODUCT_FROM_CATEGORY,
} from '../Constants/categoryConstants.ts';

export const fetchCategories = () => async (dispatch: any) => {
  try {
    dispatch({ type: FETCH_CATEGORIES_REQUEST });
    const { data } = await axios.get('/api/categories');
    dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_CATEGORIES_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const addCategory = (categoryName: string) => async (dispatch: any) => {
  try {
    const token = localStorage.getItem('liga-fpv-token');
      if (!token) {
        throw new Error('Token not found in local storage');
      }
    const { data } = await axios.post('/api/categories/add-category', { name: categoryName }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    dispatch({ type: ADD_CATEGORY, payload: data.category });
  } catch (error) {
    console.error('Ошибка при добавлении категории:', error.message);
  }
};

export const removeCategory = (categoryName: string) => async (dispatch: any) => {
  try {
    const token = localStorage.getItem('liga-fpv-token');
      if (!token) {
        throw new Error('Token not found in local storage');
      }
    await axios.delete(`/api/categories/${encodeURIComponent(categoryName)}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    dispatch({ type: REMOVE_CATEGORY, payload: categoryName });
  } catch (error) {
    console.error('Ошибка при удалении категории:', error.message);
  }
};

export const addProductToCategory = (categoryName: string, productData: any) => async (dispatch: Dispatch) => {
  try {
    const token = localStorage.getItem('liga-fpv-token');
    if (!token) {
      throw new Error('Token not found in local storage');
    }

    const formData = new FormData();
    formData.append('folder', 'ProductImages');
    formData.append('categoryName', categoryName);

    const convertToBlob = (dataUrl: string) => {
      const [header, base64] = dataUrl.split(',');
      const binary = atob(base64);
      const array = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        array[i] = binary.charCodeAt(i);
      }
      const mime = header.match(/:(.*?);/)[1];
      return new Blob([array], { type: mime });
    };

    ['titleImage', 'hoverImage'].forEach((key) => {
      if (productData[key]) {
        const value = productData[key];
        const blob = value.startsWith('data:') ? convertToBlob(value) : value;
        formData.append(key, blob, `${key}.png`);
      }
    });

    if (productData.imagesCollection && productData.imagesCollection.length > 0) {
      productData.imagesCollection.forEach((image: string, index: number) => {
        const blob = image.startsWith('data:') ? convertToBlob(image) : image;
        formData.append(`image_${index}`, blob, `image_${index}.png`);
      });
    }

    Object.entries(productData).forEach(([key, value]) => {
      if (key === 'specifications') {
        formData.append(key, JSON.stringify(value));
      } else if (key === 'parametrs') {
        formData.append(key, JSON.stringify(value)); 
      } else if (!['titleImage', 'hoverImage', 'imagesCollection'].includes(key)) {
        formData.append(key, value);
      }
    });

    const { data } = await axios.post(
      '/api/categories/add-product',
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: ADD_PRODUCT_TO_CATEGORY,
      payload: { categoryName, product: data.product },
    });

    console.log('Продукт успешно добавлен:', data.product);
  } catch (error: any) {
    console.error('Ошибка при добавлении продукта:', error.message);
  }
};




export const removeProductFromCategory = (categoryName: string, productId: string) => async (dispatch: any) => {
  try {
    const token = localStorage.getItem('liga-fpv-token');
    if (!token) {
      throw new Error('Token not found in local storage');
    }

    await axios.delete(`/api/categories/${categoryName}/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: REMOVE_PRODUCT_FROM_CATEGORY,
      payload: { categoryName, productId },
    });
  } catch (error) {
    console.error('Ошибка при удалении продукта:', error.message);
  }
};

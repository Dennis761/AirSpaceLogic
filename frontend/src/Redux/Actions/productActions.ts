import axios from 'axios';
import { AppDispatch } from '../store';
import {
    FETCH_PRODUCT_REQUEST,
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCT_FAILURE,
    CREATE_PRODUCT,
    DELETE_PRODUCT
  } from '../Constants/productConstants.ts';
  
  interface Product {
    _id: string;
    name: string;
    price: number;
    discount?: number;
    titleImage: string;
    hoverImage: string;
    rating?: number;
    parametrs?: string[];
    imagesCollection: string;
    ratingCount?: number;
  }

export const fetchProduct = (productId: string) => async (dispatch: AppDispatch) => {
  dispatch({ type: FETCH_PRODUCT_REQUEST });

  try {
    const { data } = await axios.get(`/api/products/${productId}`);
    dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCT_FAILURE,
      payload: error.response?.data?.message || 'Ошибка загрузки продукта',
    });
  }
};

export const createProduct = (productData: Product) => async (dispatch: AppDispatch) => {
  try {
    const token = localStorage.getItem('liga-fpv-token');
    if (!token) {
      throw new Error('Token not found in local storage');
    }
    console.log('createProduct')
    const formData = new FormData();
    formData.append('folder', 'ProductImages');

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
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
  }

      const response = await axios.post(
        '/api/products/create-product', 
        formData,
        {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
      dispatch({
        type: CREATE_PRODUCT,
        payload: { product: productData },
      });
    } catch (error) {
      console.error('Error adding product:', error);
    }
}

export const deleteProduct = (productId: string) => async (dispatch: AppDispatch) => {
  try {
    const token = localStorage.getItem('liga-fpv-token');
        if (!token) {
          throw new Error('Token not found in local storage');
        }
    await axios.delete(`/api/products/delete-product/${productId}`, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
  });
    dispatch({
      type: DELETE_PRODUCT,
      payload: { productId },
    });
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};

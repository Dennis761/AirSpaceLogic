import axios from "axios";
import {
  PRODUCT_SEARCH_REQUEST,
  PRODUCT_SEARCH_SUCCESS,
  PRODUCT_SEARCH_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
} from "../Constants/searchProductConstants.ts";

export const deleteProduct = (id: string) => async (dispatch: any) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });

    await axios.delete(`/api/search/${id}`);

    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: id });
  } catch (error: any) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: error.response?.data?.message || "Ошибка удаления товара",
    });
  }
};

export const searchProducts = (prefix, page = 1, limit = 10) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_SEARCH_REQUEST });
    const response = await axios.get(`/api/search`, {
      params: { prefix, page, limit },
    });

    const data = response.data;
    dispatch({
      type: PRODUCT_SEARCH_SUCCESS,
      payload: {
        products: data.products,
        hasMore: data.hasMore,
        currentPage: page,
      },
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_SEARCH_FAIL,
      payload: error.response?.data?.message || "Ошибка поиска",
    });
  }
};


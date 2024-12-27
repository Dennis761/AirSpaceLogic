import axios from 'axios';
import { Dispatch } from 'redux';
import {
  FETCH_CATALOGS,
  FETCH_CATALOGS_REQUEST,
  FETCH_CATALOGS_FAILURE,
  FETCH_SUBCATALOGS,
  FETCH_SUBCATALOGS_REQUEST,
  FETCH_SUBCATALOGS_FAILURE,
  ADD_CATALOG,
  ADD_SUBCATALOG,
  DELETE_CATALOG,
  DELETE_SUBCATALOG,
} from '../Constants/catalogConstants.ts';

export const fetchCatalogs = () => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_CATALOGS_REQUEST });

  try {
    const response = await axios.get('/api/catalog');
    dispatch({
      type: FETCH_CATALOGS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_CATALOGS_FAILURE,
      payload: error.message || 'Error fetching catalogs',
    });
  }
};


export const fetchCatalogSubcatalogs = (catalogName: string) => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_SUBCATALOGS_REQUEST });

  try {
    const response = await axios.get(`/api/catalog/${catalogName}`);
    dispatch({
      type: FETCH_SUBCATALOGS,
      payload: {
        catalogName,
        subCatalogs: response.data.subCatalogs,
      },
    });
  } catch (error) {
    dispatch({
      type: FETCH_SUBCATALOGS_FAILURE,
      payload: error.message || 'Error fetching subcatalogs',
    });
  }
};

export const addCatalog = (catalogName: string) => async (dispatch: Dispatch) => {
  try {
    const token = localStorage.getItem('liga-fpv-token');
    if (!token) throw new Error('Token not found in local storage');

    const response = await axios.post(
      '/api/catalog/add-catalog',
      { catalogName },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    dispatch({
      type: ADD_CATALOG,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error adding catalog:', error);
  }
};

export const addSubcatalog = (
  catalogKey: string,
  subcatalogName: string
) => async (dispatch: Dispatch) => {
  try {
    const token = localStorage.getItem('liga-fpv-token');
    if (!token) throw new Error('Token not found in local storage');

    const response = await axios.post(
      '/api/catalog/add-subcatalog',
      { catalogKey, subcatalogName },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(response.data.subcatalogs)
    dispatch({
      type: ADD_SUBCATALOG,
      payload: response.data, 
    });
  } catch (error) {
    console.error('Error adding subcatalog:', error);
  }
};

export const deleteCatalog = (catalogKey: string) => async (dispatch: Dispatch) => {
  try {
    const token = localStorage.getItem('liga-fpv-token');
    if (!token) throw new Error('Token not found in local storage');

    await axios.delete(`/api/catalog/delete-catalog/${catalogKey}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({
      type: DELETE_CATALOG,
      payload: catalogKey,
    });
  } catch (error) {
    console.error('Error deleting catalog:', error);
  }
};

export const deleteSubcatalog = (
  catalogKey: string,
  subcatalogKey: string
) => async (dispatch: Dispatch) => {
  try {
    const token = localStorage.getItem('liga-fpv-token');
    if (!token) throw new Error('Token not found in local storage');

    await axios.delete(`/api/catalog/delete-subcatalog/${catalogKey}/${subcatalogKey}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({
      type: DELETE_SUBCATALOG,
      payload: { catalogKey, subcatalogKey },
    });
  } catch (error) {
    console.error('Error deleting subcatalog:', error);
  }
};

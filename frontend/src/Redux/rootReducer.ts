import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './Reducers/authReducer.ts';
import { cartReducer } from './Reducers/cartReducer.ts';
import { contactFormReducer } from './Reducers/contactReducer.ts';
import { orderReducer } from './Reducers/sendRequestReducer.ts'
import { categoryReducer } from './Reducers/categoryReducer.ts'
import { catalogReducer } from './Reducers/catalogReducers.ts';
import { slideReducer } from './Reducers/slideReducer.ts'
import { subcatalogReducer } from './Reducers/subcatalogProductsReducer.ts';
import { productReducer } from './Reducers/productReducer.ts'
import { commentReducer } from './Reducers/commentReducer.ts';
import { searchProductReducer } from './Reducers/searchProductReducer.ts';
import { currencyReducer } from './Reducers/currencyReducer.ts'

const rootReducer = combineReducers({
  auth: authReducer, 
  cart: cartReducer, 
  currency: currencyReducer,
  contactForm: contactFormReducer,
  order: orderReducer,
  category: categoryReducer,
  catalog: catalogReducer,
  slides: slideReducer,
  subCatalogProducts: subcatalogReducer,
  product: productReducer,
  comments: commentReducer,
  searchProduct: searchProductReducer
});

export default rootReducer;

import express from 'express';
import {
  addProductCategory,
  deleteProductCategory,
  getProductCategories,
  getAllCategoriesWithProducts,
} from '../Controllers/ProductCategoryControllers.js';
import checkAuth from '../Middlewares/CheckAuth.js';

const router = express.Router();

router.post('/category', checkAuth, addProductCategory);

router.delete('/category/:categoryId', checkAuth, deleteProductCategory);

router.get('/categories', checkAuth, getProductCategories);

router.get('/categories-with-products', checkAuth, getAllCategoriesWithProducts);

export default router;



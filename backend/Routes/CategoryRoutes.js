import express from 'express';
import {
  getCategoriesWithProducts,
  addCategory,
  removeCategory,
  addProductToCategory,
  removeProductFromCategory,
} from '../Controllers/CategoryControllers.js';
import { upload } from '../Middlewares/UploadFile.js';
import checkAuth from '../Middlewares/CheckAuth.js';


const router = express.Router();

router.get('/', getCategoriesWithProducts);

router.post(
  '/add-product',
  checkAuth,
  (req, res, next) => {
    req.body.folder = req.headers['folder'] || 'ProductImages';
    next();
  },
  upload.any(),
  (req, res, next) => {
    next();
  },
  addProductToCategory
);

router.delete('/:categoryName', checkAuth, removeCategory);

router.post('/add-category', checkAuth, addCategory);

router.delete('/:categoryName/:productId', checkAuth, removeProductFromCategory);

export default router;

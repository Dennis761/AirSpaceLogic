import express from 'express';
import { getProductById, createProduct, deleteProduct } from '../Controllers/ProductControllers.js';
import { upload } from '../Middlewares/UploadFile.js';
import checkAuth from '../Middlewares/CheckAuth.js';

const router = express.Router();

router.get('/:productId', getProductById);

router.post('/create-product', checkAuth, (req, res, next) => {
    req.body.folder = req.headers['folder'] || 'ProductImages';
    next();
  },
  upload.any(), 
  (req, res, next) => {
    next();
  }, 
  createProduct);

router.delete('/delete-product/:productId', checkAuth, deleteProduct);

export default router;

import express from "express";
import { getSubCatalogProducts, addProductToSubcatalog, deleteProductFromSubcatalog } from "../Controllers/SubcatalogProductsControllers.js";
import { upload } from '../Middlewares/UploadFile.js';
import checkAuth from '../Middlewares/CheckAuth.js';

const router = express.Router();

router.get("/:catalogName/:subcatalogName", getSubCatalogProducts);

router.post('/add-product', checkAuth, (req, res, next) => {
    req.body.folder = req.headers['folder'] || 'ProductImages';
    next();
  },
  upload.any(), 
  (req, res, next) => {
    next();
  },
  addProductToSubcatalog);

router.delete('/delete-product/:catalogKey/:subcatalogKey/:productId', checkAuth, deleteProductFromSubcatalog);

export default router;

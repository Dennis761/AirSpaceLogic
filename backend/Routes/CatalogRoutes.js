import express from 'express';
import {
  getCatalogs,
  addCatalog,
  addSubcatalog,
  getCatalogSubcatalogs,
  deleteCatalog,
  deleteSubcatalog,
} from '../Controllers/CatalogControllers.js';
import checkAuth from '../Middlewares/CheckAuth.js';

const router = express.Router();

router.get('/', getCatalogs);

router.get("/:catalogName", getCatalogSubcatalogs);

router.post('/add-catalog', checkAuth, addCatalog);

router.post('/add-subcatalog', checkAuth, addSubcatalog);

router.delete('/delete-catalog/:catalogKey', checkAuth, deleteCatalog);

router.delete('/delete-subcatalog/:catalogKey/:subcatalogKey', checkAuth, deleteSubcatalog);

export default router;

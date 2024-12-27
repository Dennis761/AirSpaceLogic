import express from 'express';
import {
    addMainPageOffer,
    addProductToMainPageOffers,
    getOffersWithProducts,
    deleteMainPageOfferAndProducts,
    deleteMainPageProduct
} from '../Controllers/MainPageOffersControllers.js';
import checkAuth from '../Middlewares/CheckAuth.js'

const router = express.Router();

router.post('/add-offer', checkAuth, addMainPageOffer);

router.post('/add-product', checkAuth, addProductToMainPageOffers);
 
router.get('/offers', getOffersWithProducts);

router.delete('/delete-offer', checkAuth, deleteMainPageOfferAndProducts);

router.delete('/delete-product', checkAuth, deleteMainPageProduct);

export default router;

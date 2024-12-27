import express from 'express';
import { addSlide, getSlides, deleteSlide } from '../Controllers/SlideControllers.js';
import { upload } from '../Middlewares/UploadFile.js';
import checkAuth from '../Middlewares/CheckAuth.js';

const router = express.Router();


router.get('/', getSlides);

router.post(
  '/',
  checkAuth,
  (req, res, next) => {
    req.body.folder = req.headers['folder'] || 'SlidesProductImages';
    next();
  },
  upload.fields([
    { name: 'desktopImage', maxCount: 1 },
    { name: 'mobileImage', maxCount: 1 },
  ]),
  (req, res, next) => {
    console.log('req.files:', req.files);
    next();
  },
  addSlide
);



  

router.delete('/:name', checkAuth, deleteSlide);


export default router;

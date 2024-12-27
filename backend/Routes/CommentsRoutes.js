import express from 'express';
import { getProductComments, addCommentToProduct } from '../Controllers/CommentsControllers.js';

const router = express.Router();

router.get('/:productId/comments', getProductComments);

router.post('/:productId/comments', addCommentToProduct);

export default router;

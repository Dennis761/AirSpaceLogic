import express from 'express';
import { sendOrderToTelegram } from '../Controllers/SendOrderToTelegram.js';

const router = express.Router();

router.post('/sendOrderToTelegram', sendOrderToTelegram);

export default router;

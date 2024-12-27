import express from 'express';
import { sendTelegramMessage } from '../Controllers/TelegramControllers.js';

const router = express.Router();

router.post('/sendToTelegram', sendTelegramMessage);

export default router;

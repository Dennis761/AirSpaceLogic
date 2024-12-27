import express from 'express';
import { loginAdmin, register } from '../Controllers/AuthControllers.js';

const router = express.Router();

router.post('/login-admin', loginAdmin);

router.post('/sign-up', register)

export default router;

import express from 'express';
import connectDB from './db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import telegramRoutes from './Routes/TelegramRoutes.js';
import sendOrderToTelegramRoutes from './Routes/SendOrderToTelegram.js';
import authRoutes from './Routes/AuthRoutes.js';
import catalogRoutes from './Routes/CatalogRoutes.js'
import subcatalogRoutes from './Routes/SubcatalogProductsRoutes.js'
import slideRoutes from './Routes/SlideRoutes.js';
import categoryRoutes from './Routes/CategoryRoutes.js'
import productRoutes from './Routes/ProductRoutes.js'
import commentsRoutes from './Routes/CommentsRoutes.js'
import searchProductRoutes from './Routes/SearchProductRoutes.js'
import cookieParser from "cookie-parser";

dotenv.config();

connectDB()

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

app.use('/', telegramRoutes);
app.use('/', sendOrderToTelegramRoutes);
app.use('/api/catalog', catalogRoutes);
app.use('/api/subcatalog', subcatalogRoutes);
app.use('/api/slides', slideRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/search', searchProductRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});


import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // LigaFPV
  api_key: process.env.CLOUDINARY_API_KEY,       // 667485448755457
  api_secret: process.env.CLOUDINARY_API_SECRET, // ZN7y6A6TDKkE6NPeAm_zCnSyTLk
});

console.log('Cloudinary подключен:', cloudinary.config().cloud_name); // Вывод имени Cloudinary

export default cloudinary;

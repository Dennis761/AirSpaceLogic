import multer from 'multer';
import path from 'path';
import fs from 'fs-extra';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { folder } = req.body; 
    const validFolders = ['SlidesProductImages', 'ProductImages', 'SubproductImages'];

    if (!validFolders.includes(folder)) {
      return cb(new Error('Указана недопустимая папка.'));
    }

    const uploadPath = path.resolve('Uploads', folder);
    fs.ensureDirSync(uploadPath); 
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Недопустимый тип файла. Только изображения.'));
  }
};

export const upload = multer({ storage, fileFilter });

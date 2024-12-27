import cloudinary from './cloudinary.mjs';

export const uploadToCloudinary = async (filePath, folder) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, { folder });
    if (!result.secure_url) {
      throw new Error('URL отсутствует в ответе Cloudinary.');
    }
    return result;
  } catch (error) {
    console.error('Ошибка при загрузке:', error);
    throw new Error(`Ошибка загрузки файла ${filePath} в Cloudinary: ${error.message}`);
  }
};


export const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw new Error('Ошибка удаления изображения: ' + error.message);
  }
};
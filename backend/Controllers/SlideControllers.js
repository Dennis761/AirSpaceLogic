import AdminModel from '../Models/AdminModel.js';
import { uploadToCloudinary, deleteImage } from '../services/cloudinaryController.js';
import path from 'path';
import fs from 'fs-extra';

export const getSlides = async (req, res) => {
  try {
    const admin = await AdminModel.findOne();
    if (!admin) {
      return res.status(404).json({ message: 'Администратор не найден' });
    }

    res.json(admin.banners);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
};

export const addSlide = async (req, res) => {
  try {
    const { folder } = req.body; 
    const { mobileImage, desktopImage } = req.files; 

    if (!folder) {
      return res.status(400).json({ message: 'Папка не указана.' });
    }

    if (!mobileImage || !desktopImage) {
      return res.status(400).json({ message: 'Оба изображения должны быть загружены.' });
    }

    const mobileUpload = await uploadToCloudinary(mobileImage[0].path, folder);
    const desktopUpload = await uploadToCloudinary(desktopImage[0].path, folder);


    await fs.remove(mobileImage[0].path);
    await fs.remove(desktopImage[0].path);

    const newSlide = {
      mobileImage: mobileUpload.secure_url,
      desktopImage: desktopUpload.secure_url,
      mobilePublicId: mobileUpload.public_id,
      desktopPublicId: desktopUpload.public_id,
    };
    
    const admin = await AdminModel.findOne();
    if (!admin) {
      return res.status(404).json({ message: 'Администратор не найден.' });
    }

    admin.banners.push(newSlide);
    await admin.save();

    res.status(200).json({ message: 'Слайд добавлен.', banner: newSlide });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при добавлении слайда.', error: error.message });
  }
};


export const deleteSlide = async (req, res) => {
    try {
      const { name } = req.params; 
      const admin = await AdminModel.findOne();
      if (!admin) {
        return res.status(404).json({ message: 'Администратор не найден.' });
      }
      const slideIndex = admin.banners.findIndex(
        (slide) => slide.desktopImage.includes(name) || slide.mobileImage.includes(name)
      );
      if (slideIndex === -1) {
        return res.status(404).json({ message: 'Слайд не найден.' });
      }
  
      const slide = admin.banners[slideIndex];
      console.log(slide.desktopPublicId)

      await deleteImage(slide.desktopPublicId);
      await deleteImage(slide.mobilePublicId);

      admin.banners.splice(slideIndex, 1);
      await admin.save();
  
      res.status(200).json({ message: 'Слайд удалён.', banners: admin.banners });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при удалении слайда.', error: error.message });
    }
  }
import AdminModel from '../Models/AdminModel.js';

export const addBanner = async (req, res) => {
    try {
        const adminId = req.userId
        const { desktopImage, mobileImage } = req.files;

        if (!desktopImage || !mobileImage) {
          return res.status(400).json({ message: 'Оба изображения должны быть загружены' });
        }
    
        const newBanner = {
          desktopImage: `/Uploads/${desktopImage[0].filename}`,
          mobileImage: `/Uploads/${mobileImage[0].filename}`,
        };
        
        const admin = await AdminModel.findById(adminId);
        
        admin.banners.push(newBanner);
        await admin.save();

        res.status(200).json({ message: 'Баннер добавлен', banners: admin.banners });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при добавлении баннера', error });
    }
};

export const deleteBanner = async (req, res) => {
    try {
        const adminId = req.userId
        const { bannerId } = req.params;
        const admin = await AdminModel.findById(adminId);

        admin.banners.id(bannerId).remove();
        await admin.save();

        res.status(200).json({ message: 'Баннер удален', banners: admin.banners });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при удалении баннера', error });
    }
};


export const getBanners = async (req, res) => {
    try {
        const admin = await AdminModel.findOne();
        res.status(200).json({ banners: admin.banners });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении баннеров', error });
    }
};

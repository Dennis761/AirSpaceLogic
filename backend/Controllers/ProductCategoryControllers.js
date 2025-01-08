import AdminModel from '../Models/AdminModel.js';
import ProductModel from '../Models/ProductModel.js';

export const addProductCategory = async (req, res) => {
    try {
        const adminId = req.userId;
        const { name, productIds } = req.body;
        const admin = await AdminModel.findById(adminId);

        const newCategory = { name, productIds };
        admin.productCategories.push(newCategory);
        await admin.save();

        res.status(200).json({ message: 'Категория добавлена', productCategories: admin.productCategories });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при добавлении категории', error });
    }
};

export const addProductToCategory = async (req, res) => {
    try {
        const adminId = req.userId;
        const { categoryId, productId } = req.body;
        const admin = await AdminModel.findById(adminId);

        const category = admin.productCategories.id(categoryId);
        if (!category) return res.status(404).json({ message: 'Категория не найдена' });

        category.productIds.push(productId);
        await admin.save();

        res.status(200).json({ message: 'Товар добавлен в категорию', category });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при добавлении товара в категорию', error });
    }
};

export const deleteProductCategory = async (req, res) => {
    try {
        const adminId = req.userId;
        const { categoryId } = req.params;
        const admin = await AdminModel.findById(adminId);

        const category = admin.productCategories.id(categoryId);
        if (!category) return res.status(404).json({ message: 'Категория не найдена' });

        category.remove();
        await admin.save();

        res.status(200).json({ message: 'Категория удалена', productCategories: admin.productCategories });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при удалении категории', error });
    }
};

export const getProductCategories = async (req, res) => {
    try {
        const adminId = req.userId;
        const admin = await AdminModel.findById(adminId);

        res.status(200).json({ productCategories: admin.productCategories });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении категорий', error });
    }
};

export const getAllCategoriesWithProducts = async (req, res) => {
    try {
        const adminId = req.userId;
        const admin = await AdminModel.findById(adminId).populate({
            path: 'productCategories.productIds',
            model: 'Product',
        });

        if (!admin) return res.status(404).json({ message: 'Администратор не найден' });

        res.status(200).json({ productCategories: admin.productCategories });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении категорий с продуктами', error });
    }
};


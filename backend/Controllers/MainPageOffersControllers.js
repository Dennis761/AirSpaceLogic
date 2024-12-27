import AdminModel from '../Models/AdminModel.js';
import ProductModel from '../Models/ProductModel.js';

export const addMainPageOffer = async (req, res) => {
  try {
    const adminId = req.userId
    const { categoryName } = req.body;

    const admin = await AdminModel.findById(adminId);
    if (!admin) return res.status(404).json({ message: 'Администратор не найден' });

    const newCategory = { name: categoryName, productIds: [] };
    admin.productCategories.push(newCategory);

    await admin.save();
    res.status(201).json({ message: 'Категория успешно создана', category: newCategory });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error });
  }
};

export const addProductToMainPageOffers = async (req, res) => {
  try {
    const adminId = req.userId
    const { categoryId, productId } = req.body;

    const admin = await AdminModel.findById(adminId);
    if (!admin) return res.status(404).json({ message: 'Администратор не найден' });

    const category = admin.productCategories.id(categoryId); 
    if (!category) return res.status(404).json({ message: 'Категория не найдена' });

    category.productIds.push(productId);

    await admin.save();
    res.status(200).json({ message: 'Товар добавлен в категорию', category });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error });
  }
};

export const getOffersWithProducts = async (req, res) => {
  try {
    const adminId = req.userId

    const admin = await AdminModel.findById(adminId).populate({
      path: 'productCategories.productIds', 
      model: 'Product',
    });
    if (!admin) return res.status(404).json({ message: 'Администратор не найден' });

    res.status(200).json(admin.productCategories);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error });
  }
};


export const deleteMainPageOfferAndProducts = async (req, res) => {
  try {
    const adminId = req.userId

    const { categoryId } = req.body;

    const admin = await AdminModel.findById(adminId);
    if (!admin) return res.status(404).json({ message: 'Администратор не найден' });

    const category = admin.productCategories.id(categoryId);
    if (!category) return res.status(404).json({ message: 'Категория не найдена' });

    await ProductModel.deleteMany({ _id: { $in: category.productIds } });

    category.remove();
    await admin.save();

    res.status(200).json({ message: 'Категория и все её товары удалены' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error });
  }
};


export const deleteMainPageProduct = async (req, res) => {
  try {
    const adminId = req.userId
    const { categoryId, productId } = req.body;

    const admin = await AdminModel.findById(adminId);
    if (!admin) return res.status(404).json({ message: 'Администратор не найден' });

    const category = admin.productCategories.id(categoryId); 
    if (!category) return res.status(404).json({ message: 'Категория не найдена' });

    const productIndex = category.productIds.indexOf(productId);
    if (productIndex === -1) return res.status(404).json({ message: 'Товар не найден в категории' });

    category.productIds.splice(productIndex, 1);
    await admin.save();

    res.status(200).json({ message: 'Товар удален из категории' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error });
  }
};

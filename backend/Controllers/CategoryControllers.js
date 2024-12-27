import Admin from '../Models/AdminModel.js';
import Product from '../Models/ProductModel.js';
import { uploadToCloudinary, deleteImage } from '../services/cloudinaryController.js'
import fs from 'fs-extra';

export const getCategoriesWithProducts = async (req, res) => {
  try {
    const admin = await Admin.findOne().populate('categories.products');
    if (!admin) {
      return res.status(404).json({ message: 'Администратор не найден.' });
    }

    const categories = admin.categories.map((category) => ({
      name: category.name,
      products: category.products.map((product) => ({
        _id: product._id,
        name: product.name,
        price: product.price,
        discount: product.discount || null,
        titleImage: product.titleImage,
        imagesCollection: product.imagesCollection || [],
        hoverImage: product.hoverImage,
        rating: product.rating || 0,
        parametrs: product.parametrs || [],
        ratingCount: product.ratingCount || 0,
      })),
    }));

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении категорий.', error: error.message });
  }
};

export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Имя категории обязательно.' });
    }

    const admin = await Admin.findOne();
    if (!admin) {
      return res.status(404).json({ message: 'Администратор не найден.' });
    }

    const existingCategory = admin.categories.find((category) => category.name === name);
    if (existingCategory) {
      return res.status(400).json({ message: 'Категория с таким именем уже существует.' });
    }

    admin.categories.push({ name, products: [] });
    await admin.save();

    res.status(201).json({ message: 'Категория добавлена.', category: { name, products: [] } });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при добавлении категории.', error: error.message });
  }
};

export const removeCategory = async (req, res) => {
  try {
    const { categoryName } = req.params;

    const admin = await Admin.findOne();
    if (!admin) {
      return res.status(404).json({ message: 'Администратор не найден.' });
    }

    const categoryIndex = admin.categories.findIndex((category) => category.name === categoryName);
    if (categoryIndex === -1) {
      return res.status(404).json({ message: 'Категория не найдена.' });
    }

    admin.categories.splice(categoryIndex, 1);
    await admin.save();

    res.status(200).json({ message: 'Категория удалена.' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении категории.', error: error.message });
  }
};

export const addProductToCategory = async (req, res) => {
  try {
    const {
      categoryName,
      name,
      price,
      discount,
      discountTime,
      rating,
      ratingCount,
      manufacturer,
      videoLink,
      topContent,
      bottomContent,
      specifications,
      parametrs,
      available,
    } = req.body;
    
    const titleImage = req.files.find((file) => file.fieldname === 'titleImage');
    const hoverImage = req.files.find((file) => file.fieldname === 'hoverImage');
    const imagesCollection = req.files.filter((file) => file.fieldname.startsWith('image_'));
    
    if (!categoryName) {
      return res.status(400).json({ message: 'Необходимо указать категорию.' });
    }
    if (!titleImage || !hoverImage || !imagesCollection) {
      return res.status(400).json({ message: 'Все изображения обязательны.' });
    }
    
    const titleImageResult = await uploadToCloudinary(titleImage.path, 'ProductImages');
    const hoverImageResult = await uploadToCloudinary(hoverImage.path, 'ProductImages');
    const imagesCollectionResults = await Promise.all(
      imagesCollection.map((image) => uploadToCloudinary(image.path, 'SubproductImages'))
    );

    const imagesCollectionUrls = imagesCollectionResults.map((result) => result.secure_url);

    await fs.remove(titleImage.path);
    await fs.remove(hoverImage.path);
    await Promise.all(imagesCollection.map((file) => fs.remove(file.path)));
    
    const newProduct = new Product({
      name,
      price,
      discount: discount || null,
      discountTime: discountTime || null,
      titleImage: titleImageResult.secure_url,
      hoverImage: hoverImageResult.secure_url,
      imagesCollection: imagesCollectionUrls,
      manufacturer,
      videoLink: videoLink || null,
      topContent,
      bottomContent,
      specifications: specifications ? JSON.parse(specifications) : {},
      parametrs: parametrs ? JSON.parse(parametrs) : [],
      rating: Number(rating),
      ratingCount: Number(ratingCount),
      available: available || false,
    });

    const saved = await newProduct.save();
    console.log(saved)

    const admin = await Admin.findOne();
    if (!admin) {
      return res.status(404).json({ message: 'Администратор не найден.' });
    }

    const category = admin.categories.find((cat) => cat.name === categoryName);

    if (!category) {
      return res.status(404).json({ message: 'Категория не найдена.' });
    }

    category.products.push(newProduct._id);

    await admin.save();

    res.status(201).json({ message: 'Продукт добавлен.', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при добавлении продукта.', error: error.message });
  }
};

export const removeProductFromCategory = async (req, res) => {
  try {
    const { categoryName, productId } = req.params;

    const admin = await Admin.findOne(); 
    if (!admin) {
      return res.status(404).json({ message: 'Администратор не найден.' });
    }

    const category = admin.categories.find((cat) => cat.name === categoryName);
    if (!category) {
      return res.status(404).json({ message: 'Категория не найдена.' });
    }

    const productIndex = category.products.findIndex((id) => id.toString() === productId);
    if (productIndex === -1) {
      return res.status(404).json({ message: 'Продукт не найден в категории.' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Продукт не найден.' });
    }

    if (product.titleImage) await deleteImage(product.titleImage);
    if (product.hoverImage) await deleteImage(product.hoverImage);
    if (product.imagesCollection && product.imagesCollection.length > 0) {
      await Promise.all(product.imagesCollection.map((url) => deleteImage(url)));
    }

    category.products.splice(productIndex, 1);

    await admin.save();

    await Product.findByIdAndDelete(productId);

    res.status(200).json({ message: 'Продукт успешно удалён.' });
  } catch (error) {
    console.error('Ошибка при удалении продукта:', error.message);
    res.status(500).json({ message: 'Ошибка при удалении продукта.', error: error.message });
  }
};

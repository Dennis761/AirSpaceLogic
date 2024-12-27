import ProductModel from '../Models/ProductModel.js';
import { uploadToCloudinary, deleteImage } from '../services/cloudinaryController.js'
import fs from 'fs-extra'; 

export const getProductById = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({ message: 'Продукт не найден' });
    }

    const { comment, ...restProductData } = product.toObject();

    res.json(restProductData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

export const createProduct = async (req, res) => {
  try {
    const {
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

      const newProduct = new ProductModel({
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

      const savedProduct = await newProduct.save();
     
    res.status(201).json({
      message: "Product added successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Ошибка при добавлении продукта:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await ProductModel.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found in database' });

    const imageDeletionPromises = [
      deleteImage(product.titleImage), 
      deleteImage(product.hoverImage), 
      ...product.imagesCollection.map(image => deleteImage(image)),
    ];
    await Promise.all(imageDeletionPromises);

    await ProductModel.findByIdAndDelete(productId);

    res.status(200).json({
      message: 'Product and related images deleted successfully',
      productId: productId,
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
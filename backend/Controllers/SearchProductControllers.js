import Product from "../Models/ProductModel.js";
import { uploadToCloudinary, deleteImage } from '../services/cloudinaryController.js'
import fs from 'fs-extra';

export const searchProducts = async (req, res) => {
  try {
    const { prefix, page = 1, limit = 20 } = req.query;
    const searchQuery = { name: { $regex: prefix, $options: "i" } };
    const products = await Product.find(searchQuery)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const totalProducts = await Product.countDocuments(searchQuery);

    res.json({
      products,
      hasMore: totalProducts > page * limit,
    });
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Товар не найден." });
    }

    if (product.image) {
      await deleteImage(product.image.public_id);
    }

    await product.deleteOne();

    res.status(200).json({ message: "Товар успешно удалён." });
  } catch (error) {
    console.error("Ошибка удаления товара:", error);
    res.status(500).json({ message: "Ошибка сервера." });
  }
};

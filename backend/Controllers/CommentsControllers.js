import Product from '../Models/ProductModel.js';
import mongoose from 'mongoose'

export const getProductComments = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId).select('comments');

    if (!product) {
      return res.status(404).json({ message: 'Продукт не найден' });
    }

    res.status(200).json(product.comments);
  } catch (error) {
    console.error('Ошибка при получении комментариев:', error);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
};

export const addCommentToProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { commentText, name, rating } = req.body;

    if (!name || !commentText || rating == null) {
      return res.status(400).json({ message: 'Усі поля є обов’язковими.' });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Некоректний productId.' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Продукт не знайдено.' });
    }

    const formattedDate = new Intl.DateTimeFormat('uk-UA', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(new Date());

    const newComment = {
      name,
      commentText,
      rating,
      date: formattedDate,
    };
    product.comments.push(newComment);

    const updatedRating =
      (product.rating * product.ratingCount + rating) / (product.ratingCount + 1);
    
    
    product.rating = updatedRating;
    product.ratingCount += 1;

    await product.save();

    res.status(201).json({
      message: 'Коментар додано.',
      comment: newComment,
      updatedRating,
    });
  } catch (error) {
    console.error('Помилка при додаванні коментаря:', error);
    res.status(500).json({ message: 'Внутрішня помилка сервера.' });
  }
};

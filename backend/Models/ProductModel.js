import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: String,
    required: true,
    min: 0
  },
  discount: {
    type: Number,
    default: 0,
    min: 0
  },
  discountTime: {
    type: Number, 
    default: null,
    min: 0
  },
  titleImage: {
    type: String,
    required: true,
    validate: {
      validator: (url) => /^https?:\/\/.+/i.test(url),
      message: 'Неверный формат URL для titleImage'
    }
  },
  imagesCollection: {
    type: [String],
    required: true,
    validate: {
      validator: (arr) => arr.every((url) => /^https?:\/\/.+/i.test(url)),
      message: 'Все изображения должны быть валидными URL'
    }
  },
  hoverImage: {
    type: String,
    required: true,
    validate: {
      validator: (url) => /^https?:\/\/.+/i.test(url),
      message: 'Неверный формат URL для hoverImage'
    }
  },
  manufacturer: {
    type: String,
    required: true,
    trim: true
  },
  videoLink: {
    type: String,
    default: null,
  },
  topContent: {
    type: String,
    required: true,
    trim: true
  },
  bottomContent: {
    type: String,
    required: true,
    trim: true
  },
  specifications: {
    type: Object,
    required: true
  },
  parametrs: {
    type: [String],
    default: []
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  ratingCount: {
    type: Number,
    required: true,
    min: 0
  },
  available: {
    type: Boolean,
    required: true,
    default: false
  },
  comments: {
    type: [
      {
        name: { type: String, required: true },
        commentText: { type: String, required: true, trim: true },
        rating: { type: Number, min: 0, max: 5 },
        date: { type: String, required: true }
      }
    ],
    default: []
  }
},
{ timestamps: true });

const Product = mongoose.model('Product', ProductSchema);

export default Product;

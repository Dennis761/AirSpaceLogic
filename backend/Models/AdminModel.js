import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', 
    },
  ],
});

const subCatalogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  productIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', 
    },
  ],
});

const catalogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subCatalogs: [subCatalogSchema], 
});

const bannerSchema = new mongoose.Schema({
  desktopImage: {
    type: String,
    required: true, 
  },
  mobileImage: {
    type: String,
    required: true, 
  },
  desktopPublicId: {
    type: String, 
    required: true,
  },
  mobilePublicId: {
    type: String, 
    required: true,
  },
});


const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  banners: [bannerSchema], 
  categories: [categorySchema], 
  catalogs: [catalogSchema], 
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;

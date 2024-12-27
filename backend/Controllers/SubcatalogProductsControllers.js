import AdminModel from "../Models/AdminModel.js";
import ProductModel from "../Models/ProductModel.js";
import { uploadToCloudinary, deleteImage } from '../services/cloudinaryController.js'
import fs from 'fs-extra';

export const getSubCatalogProducts = async (req, res) => {
  const { catalogName, subcatalogName } = req.params;
  const page = parseInt(req.query.page, 10) || 1; 
  const limit = parseInt(req.query.limit, 10) || 10; 

  try {
    const admin = await AdminModel.findOne();
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const catalog = admin.catalogs.find((c) => c.name === catalogName);
    if (!catalog) {
      return res.status(404).json({ message: "Catalog not found" });
    }

    const subcatalog = catalog.subCatalogs.find((sc) => sc.name === subcatalogName);
    if (!subcatalog) {
      return res.status(404).json({ message: "Subcatalog not found" });
    }

    const totalProducts = subcatalog.productIds.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const productIdsToFetch = subcatalog.productIds.slice(startIndex, endIndex);
    const products = await ProductModel.find({ _id: { $in: productIdsToFetch } });

    const hasMore = endIndex < totalProducts;

    res.status(200).json({
      products,
      currentPage: page,
      totalProducts,
      hasMore,
    });
  } catch (error) {
    console.error("Ошибка при получении продуктов субкаталога:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const addProductToSubcatalog = async (req, res) => {
  try {
    const {
      catalogKey,
      subcatalogKey,
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
    
    if (!titleImage || !hoverImage || imagesCollection.length === 0) {
      return res.status(400).json({ message: 'Все изображения обязательны.' });
    }

    const titleImageResult = await uploadToCloudinary(titleImage.path, 'ProductImages');
    const hoverImageResult = await uploadToCloudinary(hoverImage.path, 'ProductImages');
    const imagesCollectionResults = await Promise.all(
      imagesCollection.map((image) => uploadToCloudinary(image.path, 'SubproductImages'))
    );

    const imagesCollectionUrls = imagesCollectionResults.map((result) => result.secure_url);

    if (fs.existsSync(titleImage.path)) await fs.remove(titleImage.path);
    if (fs.existsSync(hoverImage.path)) await fs.remove(hoverImage.path);
    await Promise.all(imagesCollection.map((file) => fs.remove(file.path)));

    const admin = await AdminModel.findOne();
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const catalog = admin.catalogs.find((c) => c.name === catalogKey);
    if (!catalog) return res.status(404).json({ message: "Catalog not found" });

    const subcatalog = catalog.subCatalogs.find((sc) => sc.name === subcatalogKey);
    if (!subcatalog) return res.status(404).json({ message: "Subcatalog not found" });

    const existingProduct = await ProductModel.findOne({ name: name });

    let savedProduct;
    let productId;
    if (existingProduct) {
      productId = existingProduct._id;
      savedProduct = existingProduct;
    } else {
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

      savedProduct = await newProduct.save();
      productId = savedProduct._id;
    }

    if (!subcatalog.productIds.includes(productId.toString())) {
      subcatalog.productIds.push(productId.toString());
    } else {
      return res.status(400).json({ message: "Product already exists in subcatalog" });
    }

    await admin.save();

    res.status(201).json({
      message: "Product added successfully",
      product: savedProduct
    });
  } catch (error) {
    console.error("Ошибка при добавлении продукта:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


export const deleteProductFromSubcatalog = async (req, res) => {
  const { catalogKey, subcatalogKey, productId } = req.params;

  try {
    const admin = await AdminModel.findOne();
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const catalog = admin.catalogs.find(c => c.name === catalogKey);
    if (!catalog) return res.status(404).json({ message: 'Catalog not found' });

    const subcatalog = catalog.subCatalogs.find(sc => sc.name === subcatalogKey);
    if (!subcatalog) return res.status(404).json({ message: 'Subcatalog not found' });

    const productIndex = subcatalog.productIds.findIndex(p => p.toString() === productId.toString());
    if (productIndex === -1) return res.status(404).json({ message: 'Product not found' });

    const product = await ProductModel.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found in database' });

    const imageDeletionPromises = [
      deleteImage(product.titleImage), 
      deleteImage(product.hoverImage), 
      ...product.imagesCollection.map(image => deleteImage(image)), 
    ];
    await Promise.all(imageDeletionPromises);

    subcatalog.productIds.splice(productIndex, 1); 
    await admin.save();

    await ProductModel.findByIdAndDelete(productId);

    res.status(200).json({
      message: 'Product and related images deleted successfully',
      products: subcatalog.products,
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

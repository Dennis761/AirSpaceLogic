import AdminModel from '../Models/AdminModel.js';

export const getCatalogs = async (req, res) => {
  try {
    const admin = await AdminModel.findOne().select('catalogs');
    if (!admin) {
      return res.status(404).json({ message: 'Catalogs not found' });
    }

    const catalogs = admin.catalogs.map((catalog) => ({
      name: catalog.name,
      _id: catalog._id,
      subCatalogs: catalog.subCatalogs.map((subCatalog) => ({
        name: subCatalog.name,
        _id: subCatalog._id,
      })),
    }));
    res.json({ catalogs });
  } catch (error) {
    console.error('Error fetching catalogs:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const addCatalog = async (req, res) => {
  const { catalogName } = req.body;
  
  try {
    const admin = await AdminModel.findOne();
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    admin.catalogs.push({ name: catalogName, subcatalogs: [] });
    await admin.save();

    res.status(201).json({ message: 'Catalog added successfully', catalog: admin.catalogs[admin.catalogs.length - 1] });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const deleteCatalog = async (req, res) => {
  const { catalogKey } = req.params;

  try {
    const admin = await AdminModel.findOne();
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    admin.catalogs.id(catalogKey).remove();
    await admin.save();

    res.status(200).json({ message: 'Catalog deleted successfully', catalogs: admin.catalogs });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getCatalogSubcatalogs = async (req, res) => {
  const { catalogName } = req.params;

  try {
    const admin = await AdminModel.findOne();
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const catalog = admin.catalogs.find((c) => c.name === catalogName);
    if (!catalog) {
      return res.status(404).json({ message: "Catalog not found" });
    }
    
    res.status(200).json({
      subCatalogs: catalog.subCatalogs,
    });
  } catch (error) {
    console.error("Error fetching subcatalogs:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const addSubcatalog = async (req, res) => {
  const { catalogKey, subcatalogName } = req.body;
 
  try {
    const admin = await AdminModel.findOne();
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const catalog = admin.catalogs.find((c) => c.name === catalogKey);

    if (!catalog) return res.status(404).json({ message: 'Catalog not found' });

    catalog.subCatalogs.push({ name: subcatalogName, products: [] });
    await admin.save();

    res.status(201).json({ message: 'Subcatalog added successfully', subcatalogs: catalog.subCatalogs[catalog.subCatalogs.length - 1], catalogKey });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


export const deleteSubcatalog = async (req, res) => {
  const { catalogKey, subcatalogKey } = req.params;

  try {
    const admin = await AdminModel.findOne();
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const catalog = admin.catalogs.find((c) => c.name === catalogKey);
    if (!catalog) return res.status(404).json({ message: 'Catalog not found' });

    catalog.subCatalogs = catalog.subCatalogs.filter((sub) => sub.name !== subcatalogKey);

    await admin.save();

    res.status(200).json({ message: 'Subcatalog deleted successfully', subcatalogs: catalog.subCatalogs });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const deleteProductFromSubcatalog = async (req, res) => {
  const { catalogKey, subcatalogKey, productId } = req.params;

  try {
    const admin = await Admin.findOne();
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const catalog = admin.catalogs.id(catalogKey);
    if (!catalog) return res.status(404).json({ message: 'Catalog not found' });

    const subcatalog = catalog.subcatalogs.id(subcatalogKey);
    if (!subcatalog) return res.status(404).json({ message: 'Subcatalog not found' });

    subcatalog.products.id(productId).remove();
    await admin.save();

    res.status(200).json({ message: 'Product deleted successfully', products: subcatalog.products });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

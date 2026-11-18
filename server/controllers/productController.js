import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from '../models/Product.js';
import { isCloudinaryConfigured } from '../configs/cloudinary.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.resolve(__dirname, '../uploads/products');

const ensureUploadsDir = async () => {
  await fs.mkdir(uploadsDir, { recursive: true });
};

const sanitizeFileName = (name = 'image') => name
  .toLowerCase()
  .replace(/[^a-z0-9.]+/g, '-')
  .replace(/^-+|-+$/g, '') || `image-${Date.now()}`;

const saveLocalImage = async (file) => {
  await ensureUploadsDir();
  const ext = path.extname(file.originalname || '').toLowerCase() || '.jpg';
  const base = path.basename(file.originalname || 'image', ext);
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${sanitizeFileName(base)}${ext}`;
  const outputPath = path.join(uploadsDir, filename);
  await fs.writeFile(outputPath, file.buffer);
  return `/uploads/products/${filename}`;
};

const uploadToCloudinary = (file) => new Promise((resolve, reject) => {
  const stream = cloudinary.uploader.upload_stream(
    { resource_type: 'image', folder: 'cafe-cage/products' },
    (error, result) => error ? reject(error) : resolve(result.secure_url),
  );
  stream.end(file.buffer);
});

const storeImage = async (file, req) => {
  if (isCloudinaryConfigured()) {
    try {
      return await uploadToCloudinary(file);
    } catch (error) {
      console.warn(`⚠️ Cloudinary image upload failed (${error?.http_code || ''} ${error?.message || 'unknown error'}). Using local fallback.`);
    }
  }

  const localPath = await saveLocalImage(file);
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  return `${baseUrl}${localPath}`;
};

// Add Product : /api/product/add
export const addProduct = async (req, res) => {
  try {
    if (!req.body.productData) {
      return res.status(400).json({ success: false, message: 'Product data is required.' });
    }

    let productData;
    try {
      productData = JSON.parse(req.body.productData);
    } catch {
      return res.status(400).json({ success: false, message: 'Invalid product data.' });
    }

    const images = Array.isArray(req.files) ? req.files : [];
    if (images.length === 0) {
      return res.status(400).json({ success: false, message: 'Please select at least one product image.' });
    }

    if (images.length > 4) {
      return res.status(400).json({ success: false, message: 'You can upload a maximum of 4 images.' });
    }

    const imagesUrl = await Promise.all(
      images.map((image) => storeImage(image, req))
    );

    const product = await Product.create({ ...productData, image: imagesUrl });

    return res.json({
      success: true,
      message: 'Product Added',
      image: imagesUrl,
      product,
    });
  } catch (error) {
    console.error('Add product error:', error);
    return res.status(500).json({
      success: false,
      message: error?.message || 'Unable to upload product. Please try again.',
    });
  }
};

// Get Product : /api/product/list
// Update Product : /api/product/update/:id
export const updateProduct = async (req, res) => {
  try {
    const existing = await Product.findById(req.params.id);
    if (!existing) return res.status(404).json({ success: false, message: "Product not found." });

    if (!req.body.productData) return res.status(400).json({ success: false, message: "Product data is required." });
    let productData;
    try { productData = JSON.parse(req.body.productData); }
    catch { return res.status(400).json({ success: false, message: "Invalid product data." }); }

    const allowed = ["name", "description", "category", "price", "offerPrice", "inStock"];
    const updates = {};
    for (const key of allowed) if (productData[key] !== undefined) updates[key] = productData[key];

    if (updates.name !== undefined) updates.name = String(updates.name).trim();
    if (updates.description !== undefined && !Array.isArray(updates.description)) updates.description = String(updates.description).split("\n");
    if (updates.price !== undefined) updates.price = Number(updates.price);
    if (updates.offerPrice !== undefined) updates.offerPrice = Number(updates.offerPrice);
    if (!updates.name || !updates.category || !Number.isFinite(updates.price) || !Number.isFinite(updates.offerPrice))
      return res.status(400).json({ success: false, message: "Please provide valid product details." });

    const images = Array.isArray(req.files) ? req.files : [];
    if (images.length > 0) {
      if (images.length > 4) return res.status(400).json({ success: false, message: "You can upload a maximum of 4 images." });
      updates.image = [];
      for (const image of images) updates.image.push(await storeImage(image, req));
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    return res.json({ success: true, message: "Product updated successfully.", product });
  } catch (error) {
    console.error("Update product error:", error);
    return res.status(500).json({ success: false, message: error.message || "Unable to update product." });
  }
};

// Delete Product : /api/product/:id
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found." });
    return res.json({ success: true, message: "Product deleted successfully." });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const productList = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single Product : /api/product/id
export const productById = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Change Product inStock : /api/product/stock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    await Product.findByIdAndUpdate(id, { inStock });
    res.json({ success: true, message: 'Stock Updated' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

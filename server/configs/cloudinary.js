import { v2 as cloudinary } from 'cloudinary';

export const isCloudinaryConfigured = () => Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

const connectCloudinary = async () => {
  if (!isCloudinaryConfigured()) {
    console.warn('⚠️ Cloudinary credentials are not configured. Local image fallback will be used.');
    return false;
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });

  try {
    await cloudinary.api.ping();
    console.log('✅ Cloudinary connected');
    return true;
  } catch (error) {
    console.warn(`⚠️ Cloudinary unavailable (${error?.http_code || ''} ${error?.message || 'unknown error'}). Local image fallback will be used.`);
    return false;
  }
};

export default connectCloudinary;

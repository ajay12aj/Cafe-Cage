import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';
import reservationRouter from './routes/reservationRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 4001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ सभी एरर को हैंडल करने के लिए async IIFE
(async () => {
  try {
    await connectDB();
    console.log('✅ MongoDB connected');
    await connectCloudinary();
  } catch (err) {
    console.error('❌ Fatal startup error:', err.message);
    process.exit(1); // यदि DB नहीं जुड़ा तो सर्वर बंद करें
  }
})();

// ✅ डायनामिक CORS – सभी localhost पोर्ट्स और production डोमेन को अनुमति
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), { maxAge: '7d' }));

app.use(cors({
  origin: function (origin, callback) {
    // अनुमति दें: कोई origin नहीं (Postman), localhost या 127.0.0.1, या production डोमेन
    if (!origin || origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1')) {
      callback(null, true);
    } else {
      const allowed = ['https://your-production-domain.com']; // अपना डोमेन डालें
      if (allowed.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true
}));

app.get('/', (req, res) => res.send('API is Working'));

app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);
app.use('/api/reservation', reservationRouter);

// Return clean JSON for upload/validation errors instead of an HTML 500 page.
app.use((error, req, res, next) => {
  if (error?.name === 'MulterError') {
    const message = error.code === 'LIMIT_FILE_SIZE'
      ? 'Each image must be 5 MB or smaller.'
      : error.code === 'LIMIT_FILE_COUNT'
        ? 'You can upload a maximum of 4 images.'
        : error.message || 'Image upload failed.';
    return res.status(400).json({ success: false, message });
  }

  if (error) {
    console.error('API error:', error);
    return res.status(400).json({
      success: false,
      message: error.message || 'Request failed.'
    });
  }

  return next();
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
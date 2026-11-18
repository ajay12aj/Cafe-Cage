# Cafe-Cage: Add Product + Growth Update

## Changes

### Admin Add Product
- One click on Add Product submits the product.
- The button is disabled during submission to prevent accidental duplicate clicks.
- The API returns the newly created product.
- The frontend inserts that returned product into the global product list immediately, without waiting for a second product-list API request.
- After success, admin is redirected to Product List, where the new product is already present.
- Server-side image storage now runs selected image uploads in parallel.
- Validation remains: maximum 4 images, 5 MB each, JPG/PNG/WEBP/GIF/AVIF.

### Growth
The Growth page now shows:
- Total Orders
- Total Reservations
- Total Revenue
- Today's Orders
- Today's Reservations
- Today's Revenue

Today's order/revenue calculations use India time (Asia/Kolkata) day boundaries.
Today's reservations are counted using the same India calendar date.

## Files changed
- client/src/pages/seller/AddProduct.jsx
- client/src/context/AppContext.jsx
- client/src/pages/seller/Growth.jsx
- server/controllers/productController.js
- server/controllers/orderController.js

## Run
Backend:
```bash
cd server
npm install
npm run server
```

Frontend:
```bash
cd client
npm install
npm run dev
```

The ZIP excludes node_modules. Install dependencies locally with npm install.

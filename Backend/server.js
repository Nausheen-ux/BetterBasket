const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
connectDB();

app.use(cors({
  origin: '*',  // or your frontend dev URL
  credentials: true
}));
app.use(express.json());

// Import and use routes
const productRoutes = require('./routes/productRoutes');
const quizRoutes = require('./routes/quizRoutes');
const cartRoutes = require('./routes/cartRoutes');

app.use('/api/products', productRoutes); // GET /api/products
app.use('/api/quiz', quizRoutes); // POST /api/quiz
app.use('/api/cart', cartRoutes); // POST /api/cart, GET /api/cart/green-score

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js'

dotenv.config();
connectDB();

const app = express();

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

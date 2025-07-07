// import express from 'express';
// import dotenv from 'dotenv'; //dotenv helps load environment variables from a .env file into process.env, keeping sensitive values like passwords/API keys out of your code.
// dotenv.config(); //call .env file
// import cors from 'cors'
// import connectDB from './src/config/db.js'
// import authRoutes from './src/routes/authRoutes.js'
// import messageRoute from './src/routes/messageRoute.js'


// connectDB(); //Calls your connectDB function to connect to your MongoDB before starting the app.

// const app = express(); 
// // Creates an instance of the Express app.
// // This object (app) is used to define middleware, routes, and start the server.

// app.use(cors({
//   origin: ['http://localhost:5173','https://contentfuel.netlify.app'], // replace with your frontend domain
// }));

// // ✅ Middleware to parse JSON bodies
// app.use(express.json()); 

// // ✅ Use the auth routes for any requests that start with /api/auth
// app.use('/api/auth', authRoutes);
// app.use('/api/auth',messageRoute);


// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js';
import messageRoute from './src/routes/messageRoute.js';
import { loadModel } from './src/controllers/messageController.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS
app.use(cors({
  origin: ['http://localhost:5173', 'https://contentfuel.netlify.app'],
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/auth', messageRoute);

// Health route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// ✅ Only start server after model is loaded
const startServer = async () => {
  await loadModel();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

startServer();
  
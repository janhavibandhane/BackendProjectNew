// // import express from 'express';
// // import dotenv from 'dotenv'; //dotenv helps load environment variables from a .env file into process.env, keeping sensitive values like passwords/API keys out of your code.
// // dotenv.config(); //call .env file
// // import cors from 'cors'
// // import connectDB from './src/config/db.js'
// // import authRoutes from './src/routes/authRoutes.js'
// // import messageRoute from './src/routes/messageRoute.js'


// // connectDB(); //Calls your connectDB function to connect to your MongoDB before starting the app.

// // const app = express(); 
// // // Creates an instance of the Express app.
// // // This object (app) is used to define middleware, routes, and start the server.

// // app.use(cors({
// //   origin: ['http://localhost:5173','https://contentfuel.netlify.app'], // replace with your frontend domain
// // }));

// // // ✅ Middleware to parse JSON bodies
// // app.use(express.json()); 

// // // ✅ Use the auth routes for any requests that start with /api/auth
// // app.use('/api/auth', authRoutes);
// // app.use('/api/auth',messageRoute);


// // app.get('/', (req, res) => {
// //   res.send('API is running...');
// // });

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   console.log(`🚀 Server running on http://localhost:${PORT}`);
// // });


// // server.js

// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import http from 'http';
// import { Server } from 'socket.io';
// import connectDB from './src/config/db.js';
// import authRoutes from './src/routes/authRoutes.js';
// import messageRoute from './src/routes/messageRoute.js';
// import { GoogleGenerativeAI } from '@google/generative-ai';

// dotenv.config();
// connectDB();

// const app = express();
// const server = http.createServer(app); // ⬅️ Create HTTP server for socket.io
// const io = new Server(server, {
//   cors: {
//     origin: ['http://localhost:5173', 'https://contentfuel.netlify.app'],
//     methods: ['GET', 'POST'],
//   },
// });

// // Express Middleware
// app.use(cors({
//   origin: ['http://localhost:5173', 'https://contentfuel.netlify.app'],
// }));
// app.use(express.json());

// // API Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/auth', messageRoute);

// // Root Endpoint
// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

// // 🔌 Socket.IO Logic
// io.on('connection', (socket) => {
//   console.log('🟢 New client connected:', socket.id);

//   socket.on('user-message', async (userMessage) => {
//     console.log('📨 User:', userMessage);

//     try {
//       const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
//       const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

//       const chat = model.startChat();
//       const result = await chat.sendMessage(userMessage);
//       const response = await result.response;
//       const botReply = response.text();

//       // Send Gemini response back to frontend
//       socket.emit('bot-reply', botReply);
//     } catch (error) {
//       console.error('Gemini Error:', error.message);
//       socket.emit('bot-reply', 'Sorry, something went wrong.');
//     }
//   });

//   socket.on('disconnect', () => {
//     console.log('🔴 Client disconnected:', socket.id);
//   });
// });

// // Start server with Socket.IO support
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });
// server.js

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js';
import messageRoute from './src/routes/messageRoute.js';

dotenv.config();
connectDB();

const app = express();

// Express Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://contentfuel.netlify.app,exp://192.168.0.105:8081'],
}));
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/auth', messageRoute);

// Root Endpoint
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server (without socket.io)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

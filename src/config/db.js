import mongoose from 'mongoose';
//Mongoose is an Object Data Modeling (ODM) tool that allows you to interact with MongoDB using JavaScript objects.

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
    // stops the entire Node process so you don’t run the server with a broken DB connection.
  }
};

export default connectDB;

import mongoose from "mongoose";

const connectDb = () => {
  try {
    mongoose.connect(process.env.DATABASE_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (error) {
    console.error("Error while connecting to MongoDB", error);
  }
};

export default connectDb;

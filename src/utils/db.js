import mongoose from "mongoose";

const connect = async () => {
  try {
    console.log("MONGO URI:", process.env.MONGO);

    await mongoose.connect(process.env.MONGO);

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ Actual Mongo Error:", error);
    throw error;   // Ye line important hai
  }
};

export default connect;
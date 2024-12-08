import mongoose from "mongoose";
import chalk from "chalk";

const connectDB = async () => {
  try {
    console.log(chalk.blue("Trying to connect to MongoDB..."));
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(chalk.green("MongoDB connected successfully"));
  } catch (err) {
    console.error(chalk.red("MongoDB connection failed: "), error);
    process.exit(1);
  }
};

export default connectDB;

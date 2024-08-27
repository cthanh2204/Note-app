const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_DB);
    console.log("Connect to MongoDB: ", connect.connection.host);
  } catch (error) {
    console.log("Connect to Mongoose failed: ", error.message);
    process.exit();
  }
};

module.exports = connectDb;

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");
const authRoute = require("./routes/authRoute");
const noteRoute = require("./routes/noteRoute");
dotenv.config();
connectDB();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/note", noteRoute);
const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server is running on port " + port);
});

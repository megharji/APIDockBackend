const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");  // 👈 import
const userRoutes = require("./routes/userRoutes");
const requestRoutes = require("./routes/requestRoutes");
const collectionsRoutes = require("./routes/collectionRoutes");
const historyRoutes = require("./routes/historyRoutes");

const initDb  = require("./models/index");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Testing platform");
});


// 👇 YEH IMPORTANT HAI (routes yaha connect hote hain)
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/collections", collectionsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  try {
    await initDb();

    console.log("Users table is ready");
  } catch (error) {
    console.error("DB init error:", error.message);
  }
});
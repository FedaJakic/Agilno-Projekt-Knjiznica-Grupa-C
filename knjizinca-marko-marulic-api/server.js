import express from "express";
import dotenv from "dotenv";
import productRoutes from "./controllers/productRoutes.js";
import { testConnection, syncDatabase } from './db.js';

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/knjiznica", productRoutes);

const PORT = process.env.PORT || 5000;
const ENVIROMENT = process.env.NODE_ENV || "development";

testConnection();

const startServer = async () => {
  try {
    await syncDatabase();
    
    app.listen(PORT, () => {
      console.log(`Server is running in ${ENVIROMENT} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

await startServer();

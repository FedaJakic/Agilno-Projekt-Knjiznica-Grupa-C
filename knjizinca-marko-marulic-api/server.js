import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from "./controllers/productRoutes.js";
import loginAndRegister from "./controllers/loginAndRegister.js";
import bookRoutes from "./controllers/bookRoutes.js";
import { testConnection, syncDatabase } from './db.js';

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // Zamijenite sa stvarnom domenom vašeg klijenta
    credentials: true,
  })
);
app.use(express.json())

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/knjiznica", productRoutes);

app.use("/api", loginAndRegister);

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
    console.error("Error syncing database:", error);
  }
};

await startServer();

app.use("/api/knjiznica", productRoutes);
app.use("/api/knjiznica/knjige", bookRoutes);

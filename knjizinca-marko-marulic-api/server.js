import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from "./controllers/productRoutes.js";
import userVerification from "./controllers/userVerification.js";
import { testConnection, syncDatabase } from './db.js';


dotenv.config();

const app = express();
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/knjiznica", productRoutes);

app.use("/api", userVerification);

const PORT = process.env.PORT || 5000;
const ENVIROMENT = process.env.NODE_ENV || "development";

testConnection();
syncDatabase();

app.listen(
  PORT,
  console.log(`Server is running in ${ENVIROMENT} on port ${PORT}`)
);



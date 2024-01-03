import express from "express";
import asyncHandler from "express-async-handler";
const router = express.Router();
import { Author } from "../models/Author.js";

router.get(
  "/getAllAuthors",
  asyncHandler(async (req, res) => {
    try {
      const allAuthors = await Author.findAll();
      res.json(allAuthors);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
);

export default router;

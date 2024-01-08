import express from "express";
import asyncHandler from "express-async-handler";
const router = express.Router();
import { Author } from "../models/Author.js";

router.get(
  "/getAllAuthors",
  asyncHandler(async (req, res) => {
    try {
      const allAuthors = await Author.findAll();
      res.status(200).json(allAuthors);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
);

// Create - Dodavanje novog autora
router.post(
  "/addAuthor",
  asyncHandler(async (req, res) => {
    const { authorName, authorSurname, authorBirthDate } = req.body;

    try {
      const newAuthor = await Author.create({
        first_name: authorName,
        last_name: authorSurname,
        birth_date: authorBirthDate,
      });

      res.status(201).json({
        success: true,
        message: "Autor uspješno dodan.",
        author: newAuthor,
      });
    } catch (error) {
      console.error("Server error:", error.response.data);
      res.status(500).json({
        success: false,
        message: "Greška prilikom dodavanja autora.",
        error: error.message,
      });
    }
  })
);

export default router;

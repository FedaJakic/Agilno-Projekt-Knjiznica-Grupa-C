import express from "express";
import asyncHandler from "express-async-handler";
import { Book } from "../models/Book.js";
import { Author } from "../models/Author.js";
import { Genre } from "../models/Genre.js";
import { BookGenre } from "../models/BookGenre.js";
const router = express.Router();

// Read - Dohvaćanje svih knjiga
router.get(
  "/getAllBooks",
  asyncHandler(async (req, res) => {
    try {
      const allBooks = await Book.findAll();
      res.json(allBooks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
);

// Create - Dodavanje nove knjige
router.post(
  "/addBook",
  asyncHandler(async (req, res) => {
    try {
      const newBook = await Book.create(req.body);
      res.json(newBook);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
);

// Delete - Brisanje određene knjige
router.delete(
  "/books/:id",
  asyncHandler(async (req, res) => {
    try {
      await Book.destroy({ where: { id: req.params.id } });
      res.json({ message: "Knjiga obrisana." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
);

// Read - Dohvaćanje određene knjige
router.get(
  "/books/:id",
  asyncHandler(async (req, res) => {
    try {
      const book = await Book.findByPk(req.params.id, {
        include: [Author],
      });

      const bookGenres = await BookGenre.findAll({
        where: { book_id: req.params.id },
        include: [Genre],
      });

      // Strukturirajte podatke kako želite prije nego ih vratite
      const bookData = {
        id: book.id,
        title: book.title,
        release_date: book.release_date,
        author: {
          id: book.Author.id,
          first_name: book.Author.first_name,
          last_name: book.Author.last_name,
          birth_date: book.Author.birth_date,
        },
        genres: bookGenres.map((bookGenre) => ({
          id: bookGenre.Genre.id,
          name: bookGenre.Genre.name,
        })),
      };

      res.json(bookData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
);

export default router;

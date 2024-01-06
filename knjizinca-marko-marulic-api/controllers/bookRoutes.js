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
    console.log(req);
    const {
      title,
      releaseDate,
      selectedAuthorId,
      selectedGenres,
      quantity,
      description,
    } = req.body;

    try {
      const parsedQuantity = parseInt(quantity, 10);

      if (isNaN(parsedQuantity)) {
        return res.status(400).json({
          success: false,
          message: "Količina mora biti cijeli broj.",
        });
      }

      // Dodaj knjigu u tablicu Book
      const newBook = await Book.create({
        title,
        release_date: releaseDate,
        author_id: selectedAuthorId,
        quantity: parsedQuantity,
        description: description,
      });

      // Dohvati ID stvorene knjige
      const createdBookId = newBook.id;

      // Dodaj žanrove knjige u tablicu BookGenre
      const bookGenres = selectedGenres.map((genreId) => ({
        book_id: createdBookId,
        genre_id: genreId,
      }));
      await BookGenre.bulkCreate(bookGenres);

      res.status(201).json({
        success: true,
        message: "Knjiga uspješno dodana.",
        book: newBook,
      });
    } catch (error) {
      console.error("Server error:", error.response.data);
      res.status(500).json({
        success: false,
        message: "Greška prilikom dodavanja knjige.",
        error: error.message,
      });
    }
  })
);

// Delete - Brisanje određene knjige
router.delete(
  "/books/:id",
  asyncHandler(async (req, res) => {
    try {
      await BookGenre.destroy({ where: { book_id: req.params.id } });
      const deletedRows = await Book.destroy({ where: { id: req.params.id } });

      if (deletedRows > 0) {
        res.status(200).json({
          success: true,
          message: "Knjiga uspješno obrisana.",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Knjiga s traženim ID-om nije pronađena.",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Greška prilikom brisanja knjige.",
        error: error.message,
      });
    }
  })
);

// Update - Ažuriranje postojeće knjige
router.put(
  "/updateBook/:id",
  asyncHandler(async (req, res) => {
    const {
      title,
      releaseDate,
      selectedAuthorId,
      selectedGenres,
      quantity,
      description,
    } = req.body;
    const bookId = req.params.id;

    try {
      const existingBook = await Book.findByPk(bookId);

      if (!existingBook) {
        return res.status(404).json({
          success: false,
          message: "Knjiga nije pronađena.",
        });
      }

      const parsedQuantity = parseInt(quantity, 10);

      if (isNaN(parsedQuantity)) {
        return res.status(400).json({
          success: false,
          message: "Količina mora biti cijeli broj.",
        });
      }

      await existingBook.update({
        title,
        release_date: releaseDate,
        author_id: selectedAuthorId,
        quantity: parsedQuantity,
        description: description,
      });

      // Ažuriraj žanrove knjige
      await BookGenre.destroy({ where: { book_id: bookId } });
      const updatedBookGenres = selectedGenres.map((genreId) => ({
        book_id: bookId,
        genre_id: genreId,
      }));
      await BookGenre.bulkCreate(updatedBookGenres);

      res.status(200).json({
        success: true,
        message: "Knjiga uspješno ažurirana.",
      });
    } catch (error) {
      console.error("Server error:", error.response.data);
      res.status(500).json({
        success: false,
        message: "Greška prilikom ažuriranja knjige.",
        error: error.message,
      });
    }
  })
);

// Read - Dohvaćanje određene knjige
router.get(
  "/books/:id",
  asyncHandler(async (req, res) => {
    try {
      const bookId = req.params.id;

      const book = await Book.findByPk(bookId, {
        include: [
          {
            model: Author,
            attributes: ["first_name", "last_name", "id"],
          },
          {
            model: Genre,
            attributes: ["name", "id"],
            through: {
              model: BookGenre,
              attributes: [],
            },
          },
        ],
        attributes: ["title", "release_date", "quantity", "description"],
      });

      if (!book) {
        return res.status(404).json({ message: "Knjiga nije pronađena." });
      }

      res.json(book);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
);

// Read - Dohvaćanje zanrova
router.get(
  "/getAllGenres",
  asyncHandler(async (req, res) => {
    try {
      const allGenres = await Genre.findAll();
      res.json(allGenres);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
);

export default router;

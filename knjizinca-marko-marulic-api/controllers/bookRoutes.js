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
    const { title, releaseDate, selectedAuthorId, selectedGenres } = req.body;

    try {
      // Dodaj knjigu u tablicu Book
      const newBook = await Book.create({
        title,
        release_date: releaseDate,
        author_id: selectedAuthorId,
      });

      // Dohvati ID stvorene knjige
      const createdBookId = newBook.id;

      // Dodaj žanrove knjige u tablicu BookGenre
      const bookGenres = selectedGenres.map((genreId) => ({
        book_id: createdBookId,
        genre_id: genreId,
      }));
      await BookGenre.bulkCreate(bookGenres);

      // Uspješno dodana knjiga
      res.status(201).json({
        success: true,
        message: "Knjiga uspješno dodana.",
        book: newBook,
      });
    } catch (error) {
      // Greška prilikom dodavanja knjige
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
      const deletedRows = await Book.destroy({ where: { id: req.params.id } });

      if (deletedRows > 0) {
        // Ako je barem jedan red obrisan, smatramo da je knjiga uspješno obrisana
        res.status(200).json({
          success: true,
          message: "Knjiga uspješno obrisana.",
        });
      } else {
        // Ako nijedan red nije obrisan, knjiga s traženim ID-om nije pronađena
        res.status(404).json({
          success: false,
          message: "Knjiga s traženim ID-om nije pronađena.",
        });
      }
    } catch (error) {
      // Greška prilikom brisanja knjige
      res.status(500).json({
        success: false,
        message: "Greška prilikom brisanja knjige.",
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

      // Dohvati knjigu po ID-u s povezanim podacima
      const book = await Book.findByPk(bookId, {
        include: [
          {
            model: Author,
            attributes: ["first_name", "last_name"],
          },
          {
            model: Genre,
            attributes: ["name"],
            through: {
              model: BookGenre,
              attributes: [],
            },
          },
        ],
        attributes: ["title", "release_date"],
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

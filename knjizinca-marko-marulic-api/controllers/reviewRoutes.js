import express from "express";
import asyncHandler from "express-async-handler";
import { Book } from "../models/Book.js";
import { User } from "../models/User.js";
import { Review } from "../models/Review.js";

const router = express.Router();

// Read - Dohvaćanje svih recenzija od specifične knjige
router.get(
    "/:bookId",
    asyncHandler(async (req, res) => {
        try {
			const { bookId } = req.params;
            
            const reviews = await Review.findAll({
                where: {
                    book_id_fk: bookId
                }
              });

			res.status(200).json(reviews);

		} catch (error) {
			res.status(500).json({ error: error.message });
		}
        console.log("works")
    })
  );

  // Post - dodavanje novi review
  router.post(
    "/addReview",
    asyncHandler(async (req, res) => {
      console.log(req);
      const {
        bookId,
        userId,
        reviewDate,
        rating,
        reviewComment,
      } = req.body;
  
      try {
  
        // Dodaj review u tablicu Review
        const newReview = await Review.create({
          book_id_fk: bookId,
          user_id_fk: userId,
          rating: rating,
          review_text: reviewComment,
          review_date: reviewDate,
        });
  
        /*res.status(201).json({
          success: true,
          message: "Review uspješno dodana.",
          review: newReview,
        });*/
      } catch (error) {
        console.error("Server error:", error.response.data);
        res.status(500).json({
          success: false,
          message: "Greška prilikom dodavanja review-a.",
          error: error.message,
        });
      }
    })
  );
  
// Delete - Brisanje određenog review-a
router.delete(
    "/review/:id",
    asyncHandler(async (req, res) => {
      try {
        const deletedRows = await Review.destroy({ where: { review_id: req.params.id } });
  
        if (deletedRows > 0) {
          res.status(200).json({
            success: true,
            message: "Review uspješno obrisana.",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Review s traženim ID-om nije pronađena.",
          });
        }
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Greška prilikom brisanja review.",
          error: error.message,
        });
      }
    })
  );


export default router;
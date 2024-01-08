import express from 'express';
import asyncHandler from 'express-async-handler';
import { Genre } from '../models/Genre.js';
const router = express.Router();

router.get(
	'/getAllGenres',
	asyncHandler(async (req, res) => {
		try {
			const allGenres = await Genre.findAll();
			res.status(200).json(allGenres);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	})
);

export default router;

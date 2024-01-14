import express from 'express';
import asyncHandler from 'express-async-handler';
import { roles } from '../utils/constants.js';
import { authorizeUser } from '../utils/auth.js';
import { User } from '../models/User.js';
import { Role } from '../models/Role.js';
import { Review } from '../models/Review.js';
const router = express.Router();

// @desc    Retirve All users
// @route   GET /api/users
// @access  Public
router.get(
	'/',
	authorizeUser([roles.admin]),
	asyncHandler(async (req, res) => {
		try {
			const users = await User.findAll();
			res.status(200).json({
				message: 'Successfully retrieved users!',
				data: users,
				success: true,
			});
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	})
);

// @desc    Retirve All users
// @route   GET /api/users
// @access  Public
router.get(
	'/me',
	authorizeUser([roles.admin, roles.member]),
	asyncHandler(async (req, res) => {
		try {
			const me = req.authData;
			console.log(me);
			const user = await User.findOne({
				where: {
					id: me.userId,
				},
			});
			res.status(200).json({
				message: 'Successfully retrieved logged user!',
				data: user,
				success: true,
			});
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	})
);

// @desc    Get user by ID
// @route   GET /api/users/userProfile/:userId
// @access  Public
router.get(
	'/userProfile/:userId',
	asyncHandler(async (req, res) => {
		try {
			const { userId } = req.params;
			const userProfile = await User.findOne({
				where: {
					id: userId,
				},
			});
			res.status(200).json(userProfile);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	})
);

// @desc    Update user by ID
// @route   PUT /api/users/userProfile/:userId
// @access  Public
router.put(
	'/userProfile/:userId',
	asyncHandler(async (req, res) => {
		const { userId } = req.params;
		try {
			const [updatedRows, updatedInstance] = await User.update(req.body, {
				where: { id: userId },
				returning: true,
			});
			if (!updatedRows) {
				throw new Error('Nothing updated!');
			}
			res.status(200).json({
				message: 'Successfully updated user!',
				data: updatedInstance,
				success: true,
			});
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	})
);

// @desc    Delete user by ID
// @route   PUT /api/users/userProfile/:userId
// @access  Public
router.delete(
	'/:id',
	asyncHandler(async (req, res) => {
		try {
			await Review.destroy({
				where: { user_id_fk: req.params.id },
			});

			const deletedRow = await User.destroy({
				where: { id: parseInt(req.params.id) },
			});

			res.status(200).json({
				success: true,
				message: 'User uspješno obrisana.',
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'Greška prilikom brisanja usera.',
				error: error.message,
			});
		}
	})
);

export default router;

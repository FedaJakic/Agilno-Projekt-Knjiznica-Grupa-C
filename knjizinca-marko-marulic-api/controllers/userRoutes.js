import express from 'express';
import asyncHandler from 'express-async-handler';
import { User } from '../models/User.js';
const router = express.Router();

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

export default router;

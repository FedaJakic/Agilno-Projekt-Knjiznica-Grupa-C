import express from 'express';
import asyncHandler from 'express-async-handler';
import { Role } from '../models/Role.js';
import { Membership } from '../models/Membership.js';
const router = express.Router();

// @desc    Get membership by userId
// @route   GET /api/memberships/:userId
// @access  Public
router.get(
	'/:userId',
	asyncHandler(async (req, res) => {
		try {
			const { userId } = req.params;
			const membership = await Membership.findOne({
				where: {
					user_id: userId,
				},
			});
			res.status(200).json(membership);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	})
);

export default router;

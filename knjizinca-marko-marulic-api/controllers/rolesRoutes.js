import express from 'express';
import asyncHandler from 'express-async-handler';
import { Role } from '../models/Role.js';
const router = express.Router();

// @desc    Get role by ID
// @route   GET /api/roles/:roleId
// @access  Public
router.get(
	'/:roleId',
	asyncHandler(async (req, res) => {
		try {
			const { roleId } = req.params;
			const roles = await Role.findOne({
				where: {
					id: roleId,
				},
			});
			res.status(200).json(roles);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	})
);

export default router;

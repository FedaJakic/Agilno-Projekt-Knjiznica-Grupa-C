import express from 'express';
import asyncHandler from 'express-async-handler';
import { Membership } from '../models/Membership.js';
import { verifyToken } from "../utility/authHelpers.js";
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

// @desc    Get membership from current user
// @route   GET /api/memberships/user
// @access  Private
router.get(
    "/user",
    verifyToken,
    asyncHandler(async(req, res) => {
        let memberStatus;

        try {
            memberStatus = await Membership.findAll({
                where: {
                    user_id: req.user.userId,
                },
                order: [['subscription_end', 'DESC']]
            })
        } catch (err) {
            const error = new Error(err.message);
            return next(error);
        }
        if (memberStatus.length == 0) {
            res.status(200).json(null);
        }
        res.status(200).json(memberStatus);
    })
);

// @desc    Get last membership from current user
// @route   GET /api/memberships/user/last
// @access  Private
router.get(
    "/user/last",
    verifyToken,
    asyncHandler(async(req, res) => {
        let memberStatus;

        try {
            memberStatus = await Membership.findAll({
                where: {
                    user_id: req.user.userId,
                },
                limit: 1,
                order: [['subscription_end', 'DESC']]
            })
        } catch (err) {
            const error = new Error(err.message);
            return next(error);
        }
        if (memberStatus.length == 0) {
            res.status(200).json(null);
        }
        res.status(200).json(memberStatus[0]);
    })
);

// @desc    Get membership status from current user
// @route   GET /api/memberships/user/status
// @access  Private
router.get(
    "/user/status",
    verifyToken,
    asyncHandler(async(req, res) => {
        let memberStatus;

        try {
            memberStatus = await Membership.findAll({
                where: {
                    user_id: req.user.userId,
                },
                limit: 1,
                order: [['subscription_end', 'DESC']]
            })
        } catch (err) {
            const error = new Error(err.message);
            return next(error);
        }

		//Check if exists
        if (memberStatus.length < 1) {
            res.status(200).json({status: false});
            return
        }

		//Check if active
		let today = new Date();
		const dates = memberStatus[0].subscription_end.split('-');
		let tmp = new Date(dates[0] + "-" + dates[1] + "-" + dates[2] + "T00:00:00.000Z");

		if (new Date(tmp) < new Date(today)) {
			res.status(200).json({status: false});
            return
		}
        res.status(200).json({status: true});
    })
);

// @desc    Extend membership of current user
// @route   POST /api/memberships/extend
// @access  Private
router.post(
    "/extend",
    verifyToken,
    asyncHandler(async(req, res, next) => {
        console.log('a');
        let memberStatus;
		//try to get last sub
        try {
            memberStatus = await Membership.findAll({
                where: {
                    user_id: req.user.userId,
                },
                limit: 1,
                order: [['subscription_end', 'DESC']]
            })
        } catch (err) {
            const error = new Error(err.message);
            return next(error);
        }

		//Check if date already exists
        let sub_start = new Date();
        if (memberStatus.length > 0) {
            const dates = memberStatus[0].subscription_end.split('-');
            let tmp = new Date(dates[0] + "-" + dates[1] + "-" + dates[2] + "T00:00:00.000Z");
			if (tmp > sub_start) {
				sub_start = tmp;
			}
        }

        //Adjust date
        let sub_end = new Date(sub_start);
        let _ = sub_end.getDate();
        sub_end.setMonth(sub_end.getMonth() + 1);
        if (sub_end.getDate() != _) {
            sub_end.setDate(0);
        }

		//create new sub
        try {
            const newMemberShip = await Membership.create({
                subscription_start: sub_start,
                subscription_end: sub_end,
                book_limit: 10,
                price: 11.99,
                user_id: req.user.userId,
            });
        } catch (err) {
            const error = new Error(err.message);
            return next(error);
        }
        
        res.status(201).json();
    })
);

export default router;

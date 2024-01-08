import express from "express";
import asyncHandler from "express-async-handler";
import { Lending } from "../models/Lending.js";
import { Book } from '../models/Book.js'
import { roles } from "../utils/constants.js";
import { authorizeUser } from "../utils/auth.js";
const router = express.Router();

// get all reservations
router.get(
    "/all",
  authorizeUser([roles.admin]),
  asyncHandler(async (req, res) => {
    try {
      const reservations = await Lending.findAll();
      res.status(200).json(reservations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
);

// get all active reservations
router.get(
    "/all/active",
    authorizeUser([roles.admin]),
    asyncHandler(async (req, res) => {
      try {
        const reservations = await Lending.findAll({
            where: {
                return_date: null
            }
        });
        res.status(200).json(reservations);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    })
  );

// get reservations from user
router.get(
    "/user/:userId",
    authorizeUser([roles.admin]),
    asyncHandler(async (req, res) => {
      try {
        const { userId } = req.params;
        const reservations = await Lending.findAll({
            where: {
                user_id: userId
            }
        });
        res.status(200).json(reservations);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    })
  );

// get active reservations from user
router.get(
    "/active/user/:userId",
    authorizeUser([roles.admin]),
    asyncHandler(async (req, res) => {
      try {
        const { userId } = req.params;
        const reservations = await Lending.findAll({
            where: {
                user_id: userId,
                return_date: null
            },
            include:{
              model: Book
            }
        });
        res.status(200).json(reservations);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    })
  );

// get reservation from logged user
router.get(
    "/me",
    authorizeUser([roles.admin, roles.member]),
    asyncHandler(async (req, res) => {
      try {
        const userId = req.authData.userId;
        const reservations = await Lending.findAll({
            where: {
              user_id: userId,
            },
            include: [
              {
                model: Book,
              },
            ],
        });
        res.status(200).json(reservations);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    })
  );

// get active reservations from logged user
router.get(
    "/active/me",
    authorizeUser([roles.admin, roles.member]),
    asyncHandler(async (req, res) => {
      try {
        const userId = req.authData.userId;
        const reservations = await Lending.findAll({
            where: {
              user_id: userId,
              return_date: null
            },
            include: {
              model: Book
            }

        });
        res.status(200).json(reservations);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
      }
    })
  );

// Create book lending
router.post(
  "/",
  authorizeUser([roles.admin, roles.member]),
  asyncHandler(async (req, res) => {
    try {
      const data = req.body
      data["user_id"] = req.authData.userId;
      const newLending = await Lending.create(data);
      res.status(201).json(newLending);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
);

// Update book lending
router.put(
    "/:id",
    authorizeUser([roles.admin]),
    asyncHandler(async (req, res) => {
      const { id } = req.params;
      try {
        const [updatedRows, updatedInstance] = await Lending.update(req.body, {
            where: { id },
            returning: true
        });
        if (!updatedRows) {
            throw new Error("Nothing updated!")
        }
        res.status(200).json({
            message: 'Successfully updated lending!',
            data: updatedInstance
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    })
  );
  

// Delete book lending
router.delete(
  "/:id",
  authorizeUser([roles.admin]),
  asyncHandler(async (req, res) => {
    try {
      await Lending.destroy({ where: { id: req.params.id } });
      res.status(200).json({ message: "Lending deleted." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
);


export default router;

import express from "express";
import asyncHandler from "express-async-handler";
import { User } from "../models/User.js";

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    res.json("user verification accessed!");
  })
);

router.get(
  "/registracija",
  asyncHandler(async (req, res) => {
    res.json("user verification accessed!");
  })
);

router.post(
  "/registracija",
  asyncHandler(async (req, res, next) => {
    const { ime, prezime, email, password, datumRodjenja } = req.body;
    const role = 5;
  
    try {
        const newUser = await User.create({
            first_name: ime,
            last_name: prezime,
            email: email,
            password: password,
            date_of_birth: datumRodjenja,
            role_id: role
        });
    } catch {
      const error = new Error("Error! Something went wrong.");
      return next(error);
    }
    res
      .status(201)
      .json({
        success: true
      });
  })
);

export default router;

import express from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { User } from "../models/User.js";
import { verifyToken } from "../utility/authHelpers.js";
import { config } from 'dotenv';

config();
const SECRET_KEY = process.env.SECRET_KEY;

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
    "/test",
    verifyToken,
    asyncHandler(async(req, res) => {
        res.json("test successful!")
    })
);

router.post(
    "/registracija",
    asyncHandler(async (req, res, next) => {
        const { ime, prezime, email, password, datumRodjenja } = req.body;
        const role = 1;

        try {
            const newUser = await User.create({
                first_name: ime,
                last_name: prezime,
                email: email,
                password: password,
                date_of_birth: datumRodjenja,
                role_id: role
            });
        } catch (err) {
            const error = new Error(err.message);
            return next(error);
        }
        res
            .status(201)
            .json({
                success: true
            });
    })
);

router.post(
    "/prijava",
    asyncHandler(async (req, res, next) => {
        let { email, password } = req.body;

        let existingUser;
        try {
            existingUser = await User.findOne({ where: { email: email } });
        } catch {
            const error = new Error("Error! Something went wrong.");
            return next(error);
        }
        if (!existingUser || existingUser.password != password) {
            const error = Error("Wrong details please check at once");
            return next(error);
        }
        let token;
        try {
            //Creating jwt token
            token = jwt.sign(
            { 
                userId: existingUser.id, 
                email: existingUser.email,
                role_id: existingUser.role_id 
            },
                SECRET_KEY,
                { expiresIn: "3h" }
            );
        } catch (err) {
            const error = new Error(err.message);
            return next(error);
        }

        res
            .status(200)
            .json({
                success: true,
                data: {
                    user_id: existingUser.id, //nema potrebe ali eto, moze se i ime dodat i te gluposti
                    token: token,
                    role_id: existingUser.role_id
                },
            });
    })
);

export default router;

import express from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { User } from "../models/User.js";
import { verifyToken } from "../utility/authHelpers.js";

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

router.post(
    "/prijava",
    asyncHandler(async (req, res, next) => {
        let { email, password } = req.body;

        let existingUser;
        try {
            existingUser = await User.findOne({ where: { email: email } }); //Promijenit ovo
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
                { userId: existingUser.id, email: existingUser.email },
                "gradskaknjiznjicamarkamarulicatajnasifra",
                { expiresIn: "3h" }
            );
        } catch (err) {
            console.log(err);
            const error = new Error("Error! Something went wrong.");
            return next(error);
        }

        res
            .status(200)
            .json({
                success: true,
                data: {
                    userId: existingUser.id,
                    admin: existingUser.admin,
                    token: token,
                },
            });
    })
);

export default router;

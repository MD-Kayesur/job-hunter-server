"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = (0, express_1.Router)();
router.post("/jwt", async (req, res) => {
    const user = req.body;
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        return res.status(500).send({ error: "JWT_SECRET is not defined" });
    }
    const token = jsonwebtoken_1.default.sign(user, secret, { expiresIn: "1h" });
    res.cookie("token", token, {
        httpOnly: true,
        secure: false, // Set to true in production
    })
        .send({ success: true });
});
exports.authRoutes = router;

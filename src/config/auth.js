import dotenv from "dotenv";
import process from "process";
dotenv.config();

export default {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
};

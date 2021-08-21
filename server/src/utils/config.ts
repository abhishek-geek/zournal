import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const SECRET = String(process.env.SECRET);
export const MONGODB_URI = String(process.env.MONGODB_URI);

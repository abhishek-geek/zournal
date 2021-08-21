import express from "express";
import useerRouter from "./router/users";
const app = express();

app.use(express.json());

app.get("/ping", (_req, res) => res.send("pong"));

app.use("/user", useerRouter);

export default app;

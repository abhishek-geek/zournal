import express from "express";
import useerRouter from "./router/users";
const app = express();
import cors from "cors";

app.use(cors());
app.use(express.json());

app.get("/ping", (_req, res) => {
  console.log("someone pinged");

  res.send("pong");
});

app.use("/user", useerRouter);

export default app;

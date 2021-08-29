import express from "express";
import useerRouter from "./router/users";
import journalRouter from "./router/journals";
const app = express();
import cors from "cors";
import middleware from "./utils/middleware";

app.use(cors());
app.use(express.json());

app.get("/ping", (_req, res) => {
  console.log("someone pinged");

  res.send("pong");
});

app.use(middleware.tokenExtractor);
app.use(middleware.userIdExtractor);
app.use("/user", useerRouter);
app.use(middleware.userExtractor);
app.use("/journal", journalRouter);

export default app;

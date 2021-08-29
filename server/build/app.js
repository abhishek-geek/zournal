"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./router/users"));
const journals_1 = __importDefault(require("./router/journals"));
const app = express_1.default();
const cors_1 = __importDefault(require("cors"));
const middleware_1 = __importDefault(require("./utils/middleware"));
app.use(cors_1.default());
app.use(express_1.default.json());
app.get("/ping", (_req, res) => {
    console.log("someone pinged");
    res.send("pong");
});
app.use(middleware_1.default.tokenExtractor);
app.use(middleware_1.default.userIdExtractor);
app.use("/user", users_1.default);
app.use(middleware_1.default.userExtractor);
app.use("/journal", journals_1.default);
exports.default = app;

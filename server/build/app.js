"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./router/users"));
const app = express_1.default();
app.use(express_1.default.json());
app.get("/ping", (_req, res) => res.send("pong"));
app.use("/user", users_1.default);
exports.default = app;

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importStar(require("../model/user"));
const router = express_1.Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = user_1.validateUser(req.body);
    if (error) {
        console.log(error.message);
        return res.status(400).send({ error: error.message });
    }
    let user = yield user_1.default.findOne({ email: String(req.body.email) });
    if (user) {
        return res
            .status(400)
            .send({ error: `${user.email} already present. Try Loging in.` });
    }
    user = new user_1.default(Object.assign({}, req.body));
    yield user.hashPassword();
    yield user.save();
    const token = user.generateAuthToken();
    return res.send({ data: token });
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { error } = user_1.validateLoginUser(req.body);
    if (error) {
        console.log(error.message);
        return res.status(400).send({ error: error.message });
    }
    const user = yield user_1.default.findOne({ email: String(req.body.email) });
    if (!user) {
        return res
            .status(400)
            .send({ error: `${req.body.email} does not present. Try Signing up.` });
    }
    const verified = yield user.comparePassword(req.body.password);
    if (!verified) {
        return res.status(400).send({ error: "Wrong Password" });
    }
    const token = user.generateAuthToken();
    // res.set("Authorization", token);
    return res.send({ token });
}));
exports.default = router;

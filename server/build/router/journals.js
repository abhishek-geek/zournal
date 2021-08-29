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
const journal_1 = __importStar(require("../model/journal"));
const router = express_1.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    console.log("user in get", user);
    if (!user) {
        console.log("login");
        return res.status(400).send({ message: `Login first` });
    }
    const journals = yield journal_1.default.find({
        author: user._id,
    });
    return res.send(journals);
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = req.user;
    if (!user) {
        return res.status(400).send({ message: `Login first` });
    }
    const journal = yield journal_1.default.findById(id);
    if (!journal) {
        return res.status(404).send({ message: `Entry not found` });
    }
    return res.send(journal);
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = journal_1.validateJournal(req.body);
    if (error) {
        console.log(error.message);
        return res.status(400).send({ error: error.message });
    }
    const user = req === null || req === void 0 ? void 0 : req.user;
    if (!user) {
        return res.status(400).send({ message: `Login first` });
    }
    console.log(req.body.date);
    //   const dd = new Date();
    const dd = new Date(req.body.date);
    console.log(dd);
    const journal = new journal_1.default({
        date: dd,
        content: String(req.body.content),
        author: String(user.id),
    });
    yield journal.save();
    return res.send(journal);
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { error } = journal_1.validateJournal(req.body);
    if (error) {
        console.log(error.message);
        return res.status(400).send({ error: error.message });
    }
    const user = req === null || req === void 0 ? void 0 : req.user;
    if (!user) {
        return res.status(400).send({ message: `Login first` });
    }
    const journal = {
        date: req.body.date,
        content: req.body.entry,
        author: user._id,
    };
    const updatedJournal = yield journal_1.default.findByIdAndUpdate(id, journal, {
        new: true,
    });
    if (!updatedJournal) {
        return res.status(404).send({ message: `Entry not found` });
    }
    yield updatedJournal.save();
    return res.send(updatedJournal);
}));
exports.default = router;

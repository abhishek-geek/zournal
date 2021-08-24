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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJournal = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importStar(require("mongoose"));
const journalSchema = new mongoose_1.Schema({
    date: {
        type: Date,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
});
function validateJournal(journal) {
    const schema = joi_1.default.object({
        date: joi_1.default.string().required(),
        content: joi_1.default.string().required(),
    });
    return schema.validate(journal, { stripUnknown: true, abortEarly: true });
}
exports.validateJournal = validateJournal;
const Journal = mongoose_1.default.model("journal", journalSchema);
exports.default = Journal;

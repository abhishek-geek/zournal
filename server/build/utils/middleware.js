"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../model/user"));
const config_1 = require("./config");
// interface Req extends Request {
//   token: string;
//   user: IUser | null;
// }
const tokenExtractor = (request, _response, next) => {
    try {
        const token = String(request.get("Authorization"));
        if (token) {
            request.token = token;
        }
    }
    catch (ex) {
        console.error(ex);
        next();
    }
    finally {
        next();
    }
};
const userExtractor = (request, _response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = request.token;
        if (token) {
            // token = token.substr(1, token.length - 2);
            console.log(token);
            const u = jsonwebtoken_1.default.verify(token, config_1.SECRET);
            const user = yield user_1.default.findById(u._id);
            request.user = user;
        }
    }
    catch (ex) {
        console.error(ex);
        next();
    }
    finally {
        next();
    }
});
const middleware = { tokenExtractor, userExtractor };
exports.default = middleware;

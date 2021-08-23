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
const app_1 = __importDefault(require("./app"));
const mongo_1 = require("./services/mongo");
const config_1 = require("./utils/config");
console.log(config_1.PORT);
console.log(config_1.MONGODB_URI);
console.log(config_1.SECRET);
void (() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongo_1.connectMongo();
    console.log(`connected to mongodb on port ${config_1.PORT}`);
}))();
// void run();
app_1.default.listen(config_1.PORT, () => {
    console.log(`connecting to port ${config_1.PORT}...`);
});

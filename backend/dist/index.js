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
const express_1 = __importDefault(require("express"));
const generateWallet_1 = require("./funtions/generateWallet");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const localDatabase = new Map();
const JWTSECRET = "THISISMYSECRET";
app.get("/health", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        message: "GOOD",
    });
}));
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //do body validation first
    const { username, password } = req.body;
    const wallet = (0, generateWallet_1.generateWallet)();
    console.log(wallet);
    res.status(200).json("User is successfuly signed up");
}));
app.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
const PORT = 6969;
app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`);
});

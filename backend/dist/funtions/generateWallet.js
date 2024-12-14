"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateWallet = void 0;
const web3_js_1 = __importDefault(require("@solana/web3.js"));
const generateWallet = () => {
    return web3_js_1.default.Keypair.generate();
};
exports.generateWallet = generateWallet;

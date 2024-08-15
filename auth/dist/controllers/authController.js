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
exports.login = exports.register = void 0;
const authService_1 = __importDefault(require("../services/authService"));
const logger_1 = __importDefault(require("../utils/logger"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        const token = yield authService_1.default.register(username, email, password);
        res.status(201).json({ token });
    }
    catch (err) {
        const message = err.message;
        res.status(500).json({ message });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    logger_1.default.debug(`email = ${email}, password = ${password}`);
    try {
        const token = yield authService_1.default.login(email, password);
        res.status(200).json({ token });
    }
    catch (err) {
        const message = err.message;
        res.status(401).json({ message });
    }
});
exports.login = login;

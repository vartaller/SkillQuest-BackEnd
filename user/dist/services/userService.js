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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const redisService_1 = __importDefault(require("./redisService"));
class UserService {
    register(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            const user = { username, password: hashedPassword };
            yield redisService_1.default.set(`user:${username}`, JSON.stringify(user));
            return user;
        });
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = yield redisService_1.default.get(`user:${username}`);
            if (!userData) {
                throw new Error('User not found');
            }
            const user = JSON.parse(userData);
            const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid credentials');
            }
            const token = jsonwebtoken_1.default.sign({ username: user.username }, process.env.JWT_SECRET, {
                expiresIn: '24h',
            });
            return token;
        });
    }
    verifyToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                return decoded;
            }
            catch (err) {
                throw new Error('Invalid token');
            }
        });
    }
}
exports.default = new UserService();

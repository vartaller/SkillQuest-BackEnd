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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("../entities/user");
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = (0, typeorm_1.getRepository)(user_1.User);
    const user = yield userRepository.findOne({ where: { id: parseInt(req.params.id, 10) } });
    return res.json(user);
});
exports.getUser = getUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = (0, typeorm_1.getRepository)(user_1.User);
    const user = userRepository.create(req.body);
    yield userRepository.save(user);
    return res.status(201).json(user);
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = (0, typeorm_1.getRepository)(user_1.User);
    yield userRepository.update(req.params.id, req.body);
    const updatedUser = yield userRepository.findOne({ where: { id: parseInt(req.params.id, 10) } });
    return res.json(updatedUser);
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = (0, typeorm_1.getRepository)(user_1.User);
    yield userRepository.delete(req.params.id);
    return res.status(204).json({});
});
exports.deleteUser = deleteUser;

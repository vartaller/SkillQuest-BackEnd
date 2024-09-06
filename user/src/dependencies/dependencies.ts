import UserService from "../services/userService";
import UserController from "../controllers/userController";
import AppDataSource from "../orm.config";
import {User} from "../entities/user";

const userRepository = AppDataSource.getRepository(User);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

export { userController };
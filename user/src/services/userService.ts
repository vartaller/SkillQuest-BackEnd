import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {v4 as uuidv4} from 'uuid';
import {User} from "../entities/user";
import {Repository} from "typeorm";
import {UserRegisteredDto} from "../dto/user.dto";
import logger from "../utils/logger";

class UserService {
    private userRepository: Repository<User>

    constructor(userRepository: Repository<User>) {
        this.userRepository = userRepository;
    }

    async createUser(user: UserRegisteredDto) {
        const hashedPassword = await bcrypt.hash(user.hashedPassword, 10);
        const userId = user.id;

        const userRegistered: User = {
            id: userId,
            username: user.username,
            email: user.email,
            password: hashedPassword,
        };

        return await this.userRepository
            .createQueryBuilder()
            .insert()
            .into(User)
            .values([userRegistered])
            .execute()
    }

    async getUserById(id: string) {

        return await this.userRepository
            .createQueryBuilder()
            .select("user")
            .from(User, "user")
            .where("user.id = :id", {id: id})
            .getOne()
    }

    async updateUser(user: User) {

        await this.userRepository
            .createQueryBuilder()
            .update(User)
            .set(user)
            .where("id = :id", {id: user.id})
            .execute();

        return user
    }

    async deleteUserById(id: string) {

        return await this.userRepository
            .createQueryBuilder()
            .delete()
            .from(User)
            .where("id = :id", {id: id})
            .execute()
    }

    async getAllUsers() {

        return await this.userRepository.find();
    }
}

export default UserService;

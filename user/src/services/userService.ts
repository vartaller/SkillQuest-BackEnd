import RedisService from './redisService';
import {User} from "../entities/user";
import AppDataSource from "../orm.config";

class UserService {
    private userRepository = AppDataSource.getRepository(User);

    async addUser(email: string, hashedPassword: string) {

        const user = this.userRepository.create({email: email, password: hashedPassword});
        await this.userRepository.save(user);
        await RedisService.set(`${email}:${hashedPassword}`, JSON.stringify(user));

        return user;
    }

    async getAllUsers() {

        const users = await this.userRepository.find();
        return users;
    }

    async getUserById(id: number) {

        const user = await this.userRepository.findOne({where: {id: id}});
        return user;
    }

    async getUserByEmail(email: string) {

        await RedisService.get(`${email}:${hashedPassword}`, JSON.stringify(user));
        const user = await this.userRepository.findOne({where: {email: email}});
        return user;
    }
}

export default new UserService();

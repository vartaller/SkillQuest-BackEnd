import "reflect-metadata"
import {DataSource} from "typeorm";
import {User} from "./entities/user";

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "my-secret-pw",
    database: "user",
    entities: [User],
    synchronize: true,
    logging: true,
    migrations: ["migration/**/*.ts"]
});

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });

export default AppDataSource;

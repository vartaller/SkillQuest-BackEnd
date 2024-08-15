"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const user_1 = require("./entities/user");
const AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "my-secret-pw",
    database: "user",
    entities: [user_1.User],
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
exports.default = AppDataSource;

import {Sequelize} from "sequelize-typescript";
import {getEnvironmentVariables} from "./environmentVariables";

export const sequelizeDbConnection = new Sequelize({
    database: getEnvironmentVariables().DB_NAME,
    username: getEnvironmentVariables().DB_USER,
    password: getEnvironmentVariables().DB_PASSWORD,
    dialect: getEnvironmentVariables().DB_DIALECT,
    host: getEnvironmentVariables().DB_HOST,
    models: [__dirname + '/**/*.model.ts'],
})

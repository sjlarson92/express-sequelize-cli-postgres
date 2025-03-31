import {Sequelize} from "sequelize-typescript";
import {getEnvironmentVariables} from "./src/environmentVariables";
import {newDb} from "pg-mem";

export const getDbConnection = async () => {
    let pgClient
    if (getEnvironmentVariables().ENVIRONMENT === 'TEST') {
        const db = newDb()
        pgClient = db.adapters.createPg()
        await db.public.migrate()
    }


    return new Sequelize({
        database: getEnvironmentVariables().DB_NAME,
        username: getEnvironmentVariables().DB_USER,
        password: getEnvironmentVariables().DB_PASSWORD,
        dialect: getEnvironmentVariables().DB_DIALECT,
        host: getEnvironmentVariables().DB_HOST,
        models: [__dirname + '/**/*.model.ts'],
        dialectModule: pgClient
    })
}

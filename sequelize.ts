import {Sequelize, DataType} from "sequelize-typescript";
import {getEnvironmentVariables} from "./src/environmentVariables";
import {newDb} from "pg-mem";
import * as fs from "node:fs";
import path from "node:path";

export const getDbConnection = async () => {
    let pgClient
    if (getEnvironmentVariables().ENVIRONMENT === 'TEST') {
        const db = newDb()
        pgClient = db.adapters.createPg()
    }

    const sequelize = new Sequelize({
        database: getEnvironmentVariables().DB_NAME,
        username: getEnvironmentVariables().DB_USER,
        password: getEnvironmentVariables().DB_PASSWORD,
        dialect: getEnvironmentVariables().DB_DIALECT,
        host: getEnvironmentVariables().DB_HOST,
        models: [__dirname + '/**/*.model.ts'],
        dialectModule: pgClient
    })

    if (getEnvironmentVariables().ENVIRONMENT === 'TEST') {
        await runTestMigrations(sequelize)
    }

    return sequelize
}

const runTestMigrations = async (sequelize: Sequelize) => {
    const queryInterface = sequelize.getQueryInterface()

    const migrationsPath = path.join(__dirname, 'migrations');
    const migrationFiles = fs.readdirSync(migrationsPath)
        .filter(file => file.endsWith('.js'))
        .sort();

    console.log(">>>> migrationFiles: ", migrationFiles)

    for (const file of migrationFiles) {
        console.log(`>>> Running migration: ${file}`);
        const migration = require(path.join(migrationsPath, file));

        await migration.up(queryInterface, DataType);
        console.log(`Completed migration: ${file}`);
    }
    console.log("All migrations completed successfully!");
}

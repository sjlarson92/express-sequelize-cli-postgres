import {getEnvironmentVariables} from "../src/environmentVariables";
import {newDb} from "pg-mem";
import {DataType, Sequelize} from "sequelize-typescript";
import path from "node:path";
import fs from "node:fs";
import dotenv from "dotenv";

// Load test environment variables
dotenv.config({path: '.env.test'});

const db = newDb()
const pgClient = db.adapters.createPg()

export const testSequelizeDbConnection = new Sequelize({
    database: getEnvironmentVariables().DB_NAME,
    username: getEnvironmentVariables().DB_USER,
    password: getEnvironmentVariables().DB_PASSWORD,
    dialect: getEnvironmentVariables().DB_DIALECT,
    host: getEnvironmentVariables().DB_HOST,
    models: [__dirname + '/../' + 'src/' + 'models' + '/**/*.model.ts'],
    dialectModule: pgClient
})

export const runTestMigrations = async () => {
    const queryInterface = testSequelizeDbConnection.getQueryInterface()

    const migrationsPath = path.join(__dirname, '..', 'migrations');
    const migrationFiles = fs.readdirSync(migrationsPath)
        .filter(file => file.endsWith('.js'))
        .sort();

    console.log(`>>> Running migration files: ${migrationFiles}`);

    for (const file of migrationFiles) {
        const migration = require(path.join(migrationsPath, file));

        await migration.up(queryInterface, DataType);
    }
    console.log("All migrations completed successfully!");
}
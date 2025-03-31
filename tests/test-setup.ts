import {getDbConnection} from "../sequelize";
import dotenv from "dotenv";
import {Sequelize} from "sequelize-typescript";

console.log('================= SETTING UP TESTS ===================');

// Load test environment variables
dotenv.config({path: '.env.test'});

let sequelize: Sequelize | null;

beforeAll(async () => {
    console.log("=============== Getting Test DB connection ==================");

    sequelize = await getDbConnection();
    await sequelize.authenticate();

    console.log("=============== TEST DB CONNECTION IS DONE! ==================");
});

afterAll(async () => {
    console.log("=============== Closing Test DB connection ==================");
    if (sequelize) {
        await sequelize.close();
    }
    console.log("=============== TEST DB CONNECTION CLOSED! ==================");
});
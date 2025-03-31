import {getDbConnection} from "../sequelize";
import dotenv from "dotenv";

console.log('================= SETTING UP TESTS ===================');

// Load test environment variables
dotenv.config({path: '.env.test'});


beforeAll(async () => {
    console.log("=============== Getting Test DB connection ==================");

    const sequelize = await getDbConnection();
    await sequelize.authenticate();

    console.log("=============== TEST DB CONNECTION IS DONE! ==================");
});
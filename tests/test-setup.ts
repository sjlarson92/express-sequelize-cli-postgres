import {runTestMigrations, testSequelizeDbConnection} from "./test-database";

beforeAll(async () => {
    console.log("=============== Getting Test DB connection ==================");

    await testSequelizeDbConnection.authenticate();
    await runTestMigrations()

    console.log("=============== TEST DB CONNECTION IS DONE! ==================");
});

afterAll(async () => {
    console.log("=============== Closing Test DB connection ==================");

    await testSequelizeDbConnection.close();

    console.log("=============== TEST DB CONNECTION CLOSED! ==================");
});
import {getEnvironmentVariables} from "./environmentVariables";
import app from "./app";
import {sequelizeDbConnection} from "./database";


export const startServer = async () => {
    try {
        console.log(".... STARTING APP....")
        await sequelizeDbConnection.authenticate();
        console.log('>>> Connection to the database has been established successfully.');
    } catch (error) {
        const errorMessage = `>>>> Unable to connect to the database: ${error}`
        console.log(errorMessage);
        throw Error(errorMessage)
    }

    app.listen(getEnvironmentVariables().PORT, () => {
        console.log(`>>> Server is running on port: ${getEnvironmentVariables().PORT}`);
    });
}

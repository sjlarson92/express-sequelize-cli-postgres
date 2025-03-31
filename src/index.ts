import express, {Express, Request, Response} from "express";

import "./models/Task.model"
import taskRouter from "./TaskRoute";
import {getEnvironmentVariables} from "./environmentVariables";
import {getDbConnection} from "../sequelize";
import dotenv from "dotenv";

dotenv.config()

const app: Express = express();

/**
 * built in middleware to handle json data. This is needed to read json
 */
app.use(express.json())

app.use('/api/tasks', taskRouter)

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

const start = async () => {
    try {
        console.log(".... STARTING APP....")
        const sequelize = await getDbConnection();
        await sequelize.authenticate();
        console.log('>>> Connection to the database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    app.listen(getEnvironmentVariables().PORT, () => {
        console.log(`>>> Server is running on port: ${getEnvironmentVariables().PORT}`);
    });
}

start();

export default app;
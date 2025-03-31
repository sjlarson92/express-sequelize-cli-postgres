import express, {Express, Request, Response} from "express";

import "./models/Task.model"
import taskRouter from "./TaskRoute";
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

export default app

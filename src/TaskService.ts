import {Request, Response} from "express";
import Task from "./models/Task.model";

export type TaskRequest = {
    name: string;
    isCompleted: boolean;
    description: string
}

// todo rename this file to controller

export const getTasks = async (req: Request, res: Response) => {
    console.log('Getting all tasks!')

    /*
     Call to db returns promise so it needs to be awaited!!
     Passing an array of [attribute, direction] to the field order field return be ordered
     and is set to ascending (ASC) by default
     */
    const tasks = await Task.findAll({
        order: [['id', 'ASC']]
    })

    res.send(tasks)
}

export const getTaskById = async (req: Request, res: Response) => {
    const {id} = req.params
    console.log(`Getting task with id: ${id}`)

    const task = await Task.findOne({where: {id}})

    res.send(task)

}

export const createTask = async (req: Request<{}, {}, TaskRequest>, res: Response) => {
    const {name, isCompleted, description} = req.body
    console.log('Creating Task with request body: ', req.body)
    /*
    create method combines build and save and builds instance and saves it to DB
     */
    const newTask = await Task.create({
        name,
        isCompleted,
        description
    })

    console.log(`Created Task: `, newTask)
    res.send(newTask)
}

export const updateTaskById = async (req: Request<{ id: string }, {}, TaskRequest>, res: Response) => {
    const {id} = req.params
    const {name, isCompleted, description} = req.body
    console.log(`Updating Task with id: ${id}`)

    // update for sequelize does not return the object, just the number of rows affected
    await Task.update(
        {
            name,
            isCompleted,
            description
        },
        {where: {id}},
    )

    const updatedTask = await Task.findOne({where: {id}})

    res.send(updatedTask)
}

export const deleteTaskById = async (req: Request, res: Response) => {
    const {id} = req.params

    console.log(`Deleting Task with id: ${id}`)

    await Task.destroy({where: {id}})

    res.send(`Successfully deleted Task with id: ${id}`)
}
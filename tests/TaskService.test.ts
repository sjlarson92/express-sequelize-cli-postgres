import request from 'supertest';
import app from '../src/index'
import Task from "../src/models/Task.model";
import {TaskRequest} from "../src/TaskService";

describe("Task Service", () => {

    describe('getTasks', () => {
        it('Get tasks should return list of tasks', async () => {
            const testTaskResponse = await request(app)
                .post('/api/tasks')
                .send({
                    name: 'Make penne pesto pasta!',
                    isCompleted: false,
                    description: "Namorada is sleepy"
                })

            console.log(`>>>> testTaskResponse.body: `, testTaskResponse.body)

            const response = await request(app)
                .get('/api/tasks')

            const responseBody: Task[] = response.body

            expect(response.status).toBe(200)
            expect(responseBody[0].name).toEqual('Make penne pesto pasta!')
            expect(responseBody[0].isCompleted).toBeFalsy()
        })

    });

    describe('getTaskById', () => {
        it('gets the right task by id', async () => {
            await request(app)
                .post('/api/tasks')
                .send({
                    id: 2,
                    name: 'Make penne pesto pasta!',
                    isCompleted: false,
                    description: "DESCRIPTION 2"
                })

            const response = await request(app)
                .get('/api/tasks/2')

            const responseBody: Task = response.body

            expect(responseBody.description).toEqual('DESCRIPTION 2')
        })
    });

    describe('createTask', () => {
        it('should create task with correct fields', async () => {
            const requestBody: TaskRequest = {
                name: 'work hard play hard',
                isCompleted: false,
                description: "new task"
            }
            const response = await request(app)
                .post('/api/tasks')
                .send(requestBody)

            const responseBody: Task = response.body

            expect(responseBody.description).toEqual(responseBody.description)
            expect(responseBody.name).toEqual(responseBody.name)
            expect(responseBody.isCompleted).toEqual(responseBody.isCompleted)
        })
    });

})
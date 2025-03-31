import request from 'supertest';
import Task from "../src/models/Task.model";
import app from "../src/app";
import {TaskRequest} from "../src/TaskService";

describe("Task Service", () => {

    describe('getTasks', () => {
        it('Get tasks should return list of tasks', async () => {
            await request(app)
                .post('/api/tasks')
                .send({
                    name: 'Make penne pesto pasta!',
                    isCompleted: false,
                    description: "Namorada is sleepy"
                })

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

    describe('update Task', () => {
        it('should update task with correct fields', async () => {
            const requestBody: TaskRequest = {
                name: 'work hard play hard',
                isCompleted: false,
                description: "new task"
            }
            const response = await request(app)
                .post('/api/tasks')
                .send(requestBody)

            const responseBody: Task = response.body

            const updateRequestBody: TaskRequest = {
                name: 'updated name',
                isCompleted: true,
                description: "updated description"
            }
            const updatedResponse = await request(app)
                .put(`/api/tasks/${responseBody.id}`)
                .send(updateRequestBody)

            const updatedResponseBody: Task = updatedResponse.body

            expect(updatedResponseBody.description).toEqual(updateRequestBody.description)
            expect(updatedResponseBody.name).toEqual(updateRequestBody.name)
            expect(updatedResponseBody.isCompleted).toEqual(updateRequestBody.isCompleted)
        })
    });

    describe('delete Task', () => {
        it('should delete correct task with by id', async () => {
            const requestBody: TaskRequest = {
                name: 'delete me',
                isCompleted: false,
                description: "new task"
            }
            const response = await request(app)
                .post('/api/tasks')
                .send(requestBody)

            const responseBody: Task = response.body

            await request(app)
                .del(`/api/tasks/${responseBody.id}`)

            const allTasksResponse = await request(app)
                .get('/api/tasks')

            const allTasksResponseBody: Task[] = allTasksResponse.body

            console.log('allTasksResponseBody', allTasksResponseBody)

            expect(allTasksResponseBody).not.toContain(responseBody)
        })
    });

})
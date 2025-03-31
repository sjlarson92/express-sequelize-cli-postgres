"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var TaskService_1 = require("./TaskService");
var taskRouter = (0, express_1.Router)();
taskRouter.route('/')
    .post(TaskService_1.createTask)
    .get(TaskService_1.getTasks);
taskRouter.route('/:id')
    .get(TaskService_1.getTaskById)
    .put(TaskService_1.updateTaskById)
    .delete(TaskService_1.deleteTaskById);
exports.default = taskRouter;

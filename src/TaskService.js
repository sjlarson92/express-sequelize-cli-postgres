"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTaskById = exports.updateTaskById = exports.createTask = exports.getTaskById = exports.getTasks = void 0;
var Task_model_1 = require("./models/Task.model");
// todo rename this file to controller
var getTasks = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tasks;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('Getting all tasks!');
                return [4 /*yield*/, Task_model_1.default.findAll({
                        order: [['id', 'ASC']]
                    })];
            case 1:
                tasks = _a.sent();
                res.send(tasks);
                return [2 /*return*/];
        }
    });
}); };
exports.getTasks = getTasks;
var getTaskById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, task;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                console.log("Getting task with id: ".concat(id));
                return [4 /*yield*/, Task_model_1.default.findOne({ where: { id: id } })];
            case 1:
                task = _a.sent();
                res.send(task);
                return [2 /*return*/];
        }
    });
}); };
exports.getTaskById = getTaskById;
var createTask = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, isCompleted, description, newTask;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, isCompleted = _a.isCompleted, description = _a.description;
                console.log('Creating Task with request body: ', req.body);
                return [4 /*yield*/, Task_model_1.default.create({
                        name: name,
                        isCompleted: isCompleted,
                        description: description
                    })];
            case 1:
                newTask = _b.sent();
                console.log("Created Task: ", newTask);
                res.send(newTask);
                return [2 /*return*/];
        }
    });
}); };
exports.createTask = createTask;
var updateTaskById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, name, isCompleted, description, updatedTask;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, name = _a.name, isCompleted = _a.isCompleted, description = _a.description;
                console.log("Updating Task with id: ".concat(id));
                // update for sequelize does not return the object, just the number of rows affected
                return [4 /*yield*/, Task_model_1.default.update({
                        name: name,
                        isCompleted: isCompleted,
                        description: description
                    }, { where: { id: id } })];
            case 1:
                // update for sequelize does not return the object, just the number of rows affected
                _b.sent();
                return [4 /*yield*/, Task_model_1.default.findOne({ where: { id: id } })];
            case 2:
                updatedTask = _b.sent();
                res.send(updatedTask);
                return [2 /*return*/];
        }
    });
}); };
exports.updateTaskById = updateTaskById;
var deleteTaskById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                console.log("Deleting Task with id: ".concat(id));
                return [4 /*yield*/, Task_model_1.default.destroy({ where: { id: id } })];
            case 1:
                _a.sent();
                res.send("Successfully deleted Task with id: ".concat(id));
                return [2 /*return*/];
        }
    });
}); };
exports.deleteTaskById = deleteTaskById;

import { newConnection } from "../db.js"
import { getTasks, getTaskById, postTask, putTaskById, deleteTaskById } from "../controllers/task.controllers.js"
import {Router} from "express"
const tasksRouter = Router()


tasksRouter.get("/tasks", getTasks)
tasksRouter.get("/task/:id", getTaskById)
tasksRouter.post("/task", postTask);
tasksRouter.put("/task/:id", putTaskById);
tasksRouter.delete("/task/:id", deleteTaskById);

export { tasksRouter }
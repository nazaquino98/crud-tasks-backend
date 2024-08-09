
import { getTasks, getTaskById, postTask, putTaskById, deleteTaskById } from "../controllers/task.controllers.js"
import { Router } from "express"
const tasksRouter = Router()

import { validacionesDeTasks } from "../validations/tasks.validations.js"
import { validacionesDeTasksUpdate } from "../validations/tasks.validations.js"
import { applyValidations } from "../validations/applyValidations.js"


tasksRouter.get("/tasks", getTasks)

tasksRouter.get("/task/:id", getTaskById)

tasksRouter.post("/task", validacionesDeTasks, applyValidations, postTask);

tasksRouter.put("/task/:id", validacionesDeTasksUpdate, applyValidations, putTaskById);

tasksRouter.delete("/task/:id", deleteTaskById);



export { tasksRouter }
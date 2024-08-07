const {newConnection} = require("../db.js")
const {getTasks, getTaskById, postTask, putTaskById, deleteTaskById} = require("../controllers/task.controllers.js")
const router = require("express").Router()


router.get("/tasks", getTasks)
router.get("/task/:id", getTaskById)
router.post("/task", postTask);
router.put("/task/:id", putTaskById);
router.delete("/task/:id", deleteTaskById);

module.exports = router
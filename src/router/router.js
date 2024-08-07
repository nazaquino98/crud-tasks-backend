const router = require("express").Router()
const tasksRouter = require("./tasks.router.js")
router.use(tasksRouter)
module.exports = router
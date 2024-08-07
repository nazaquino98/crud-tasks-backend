//iniciar servidor
const express = require("express")

//conexion a la base de datos
const {newConnection} = require("./db.js")

//crear servidor
const app = express()



//usar middlwares
app.use(express.json())

//crear las rutas

//obtener todas las tareas
app.get("/", async (req, res) => {
    const connection = await newConnection()
    const results = await connection.query("SELECT * FROM tasks")
    res.json(results[0])
    connection.end()
})

//obtener una tarea por su id
app.get("/task/:id", async (req, res) => {
    const connection = await newConnection()
    const id = req.params.id 
    const results = await connection.query("SELECT * FROM tasks WHERE id = ?", id)
    res.json(results[0])
    connection.end()
})

//crear una nueva tarea
app.post("/tasks", async (req, res) =>{
    const connection = await newConnection() 
    const {title, description, isComplete} = req.body
    connection.query("INSERT INTO tasks (title, description, isComplete) values (?, ?, ?)", [title, description, isComplete])
    res.send("tarea creada correctamente")
    connection.end()
})

//actualizar tarea
app.put("/tasks/:id", async (req, res) => {
    const connection = await newConnection()
    const id = req.params.id
    const {title, description, isComplete} = req.body
    await connection.query("UPDATE tasks SET title = ?, description = ?, isComplete = ? WHERE id = ?", [title, description, isComplete, id])
    res.send("tarea actualizada correctamente")
    connection.end()
})

//eliminar una tarea por su id 
app.delete("/tasks/:id", async (req, res) => {
    const connection = await newConnection()
    const id = req.params.id
    const results = await connection.query("DELETE FROM tasks WHERE id = ?", id)
    res.send("tarea eliminada correctamente")
    connection.end()
})


//correr servidor
const PORT = 4000
app.listen(PORT, () => console.log("servidor corriendo en el puerto " + PORT))